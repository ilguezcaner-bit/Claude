#!/usr/bin/env bash
# Shared library for all CI Consulting War Room agent scripts.
# Source this file; do not execute it directly.

COMPOSIO="$HOME/.composio/composio"
SCRIPT_DIR_LIB="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TRELLO_ROOT="$(cd "$SCRIPT_DIR_LIB/.." && pwd)"
CONFIG_FILE="$TRELLO_ROOT/config.json"
CACHE_FILE="$TRELLO_ROOT/cache/cards.json"

# ---------------------------------------------------------------------------
# Guards
# ---------------------------------------------------------------------------

if [ ! -f "$CONFIG_FILE" ]; then
  printf '\033[0;31m[ERROR]\033[0m trello/config.json not found.\n' >&2
  printf '        Run ./trello/setup.sh first.\n' >&2
  exit 1
fi

if ! command -v jq &>/dev/null; then
  printf '\033[0;31m[ERROR]\033[0m jq is required but not installed.\n' >&2
  exit 1
fi

# ---------------------------------------------------------------------------
# Output helpers
# ---------------------------------------------------------------------------

trello_ok()    { printf '\033[0;32m✓\033[0m  %s\n'    "$*"; }
trello_error() { printf '\033[0;31m✗\033[0m  %s\n'    "$*" >&2; }
trello_info()  { printf '\033[0;36m→\033[0m  %s\n'    "$*"; }

# ---------------------------------------------------------------------------
# Config accessors
# ---------------------------------------------------------------------------

trello_board_id()  { jq -r '.board_id'       "$CONFIG_FILE"; }
trello_list_id()   { jq -r ".lists.$1"       "$CONFIG_FILE"; }   # backlog|in_progress|review|completed
trello_label_id()  { jq -r ".labels.$1"      "$CONFIG_FILE"; }   # scan|quilly|ovi|larry|cleo

# ---------------------------------------------------------------------------
# Core executor
# Runs a Composio Trello tool, checks .successful, prints error and returns 1 on failure.
# Stdout: raw JSON response on success.
# ---------------------------------------------------------------------------

trello_exec() {
  local tool="$1" payload="$2"
  local result
  result=$("$COMPOSIO" execute "$tool" -d "$payload" 2>&1)
  local ok
  ok=$(printf '%s' "$result" | jq -r '.successful // false' 2>/dev/null)
  if [ "$ok" != "true" ]; then
    local err
    err=$(printf '%s' "$result" | jq -r '.error // .message // "unknown error"' 2>/dev/null || printf '%s' "$result")
    trello_error "Composio call failed ($tool): $err"
    return 1
  fi
  printf '%s' "$result"
}

# ---------------------------------------------------------------------------
# Card cache helpers
# Avoids Trello's 2-5 min search index lag for freshly created cards.
# ---------------------------------------------------------------------------

_cache_write() {
  local title="$1" card_id="$2"
  local tmp
  tmp=$(mktemp)
  jq --arg t "$title" --arg id "$card_id" '. + {($t): $id}' "$CACHE_FILE" > "$tmp" && mv "$tmp" "$CACHE_FILE"
}

_cache_read() {
  local title="$1"
  jq -r --arg t "$title" '.[$t] // empty' "$CACHE_FILE" 2>/dev/null
}

# ---------------------------------------------------------------------------
# trello_find_card <title>
# Returns card ID on stdout. Checks local cache first, then Trello search.
# ---------------------------------------------------------------------------

trello_find_card() {
  local title="$1"
  local board_id
  board_id=$(trello_board_id)

  # Cache hit — avoids search index lag for recently created cards
  local cached
  cached=$(_cache_read "$title")
  if [ -n "$cached" ]; then
    printf '%s' "$cached"
    return 0
  fi

  # Build payload safely (handles special chars in title)
  local payload
  payload=$(jq -n --arg q "$title" --arg b "$board_id" \
    '{query: $q, idBoards: $b, modelTypes: "cards", cards_limit: "20", partial: "false"}')

  local result
  result=$(trello_exec TRELLO_GET_SEARCH "$payload") || return 1

  # Exact case-insensitive match on card name
  local card_id
  card_id=$(printf '%s' "$result" | \
    jq -r --arg t "$title" \
    '[.data.cards[] | select(.name | ascii_downcase == ($t | ascii_downcase))] | first | .id // empty' \
    2>/dev/null)

  if [ -z "$card_id" ]; then
    trello_error "Card not found: \"$title\""
    trello_error "Tip: if you just created it, search index may lag — wait ~30s and retry."
    return 1
  fi

  # Populate cache for future lookups
  _cache_write "$title" "$card_id"
  printf '%s' "$card_id"
}

# ---------------------------------------------------------------------------
# trello_create_card <title> <desc> <due_date> <list_id> <label_id>
# due_date: ISO 8601 string, or empty string to omit.
# Returns card ID on stdout.
# ---------------------------------------------------------------------------

trello_create_card() {
  local title="$1" desc="$2" due="$3" list_id="$4" label_id="$5"

  local payload
  if [ -n "$due" ]; then
    payload=$(jq -n \
      --arg name  "$title" \
      --arg desc  "$desc" \
      --arg due   "$due" \
      --arg idList "$list_id" \
      '{name: $name, desc: $desc, due: $due, idList: $idList}')
  else
    payload=$(jq -n \
      --arg name  "$title" \
      --arg desc  "$desc" \
      --arg idList "$list_id" \
      '{name: $name, desc: $desc, idList: $idList}')
  fi

  local result
  result=$(trello_exec TRELLO_ADD_CARDS "$payload") || return 1
  local card_id
  card_id=$(printf '%s' "$result" | jq -r '.data.id')

  # Attach agent label
  if [ -n "$label_id" ]; then
    local label_payload
    label_payload=$(jq -n --arg id "$card_id" --arg val "$label_id" \
      '{idCard: $id, value: $val}')
    trello_exec TRELLO_ADD_CARDS_ID_LABELS_BY_ID_CARD "$label_payload" >/dev/null || true
  fi

  # Write to local cache
  _cache_write "$title" "$card_id"
  printf '%s' "$card_id"
}

# ---------------------------------------------------------------------------
# trello_move_card <card_id> <list_id>
# ---------------------------------------------------------------------------

trello_move_card() {
  local card_id="$1" list_id="$2"
  local payload
  payload=$(jq -n --arg id "$card_id" --arg idList "$list_id" \
    '{idCard: $id, idList: $idList}')
  trello_exec TRELLO_UPDATE_CARDS_BY_ID_CARD "$payload" >/dev/null
}

# ---------------------------------------------------------------------------
# trello_comment_card <card_id> <text>
# ---------------------------------------------------------------------------

trello_comment_card() {
  local card_id="$1" text="$2"
  local payload
  payload=$(jq -n --arg id "$card_id" --arg text "$text" \
    '{idCard: $id, text: $text}')
  trello_exec TRELLO_ADD_CARDS_ACTIONS_COMMENTS_BY_ID_CARD "$payload" >/dev/null
}

# ---------------------------------------------------------------------------
# trello_relabel_card <card_id> <label_id>
# Adds the new agent label (stacking is fine; scan owns assignment workflow).
# ---------------------------------------------------------------------------

trello_relabel_card() {
  local card_id="$1" label_id="$2"
  local payload
  payload=$(jq -n --arg id "$card_id" --arg val "$label_id" \
    '{idCard: $id, value: $val}')
  trello_exec TRELLO_ADD_CARDS_ID_LABELS_BY_ID_CARD "$payload" >/dev/null
}
