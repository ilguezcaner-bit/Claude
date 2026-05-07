#!/usr/bin/env bash
# One-time setup: creates the CI Consulting War Room Trello board,
# 4 pipeline lists, and 5 agent labels. Writes trello/config.json.
set -euo pipefail

COMPOSIO="$HOME/.composio/composio"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/config.json"
CACHE_DIR="$SCRIPT_DIR/cache"

# ---------------------------------------------------------------------------
# Guards
# ---------------------------------------------------------------------------

if [ -f "$CONFIG_FILE" ]; then
  printf '\033[0;33m[WARN]\033[0m trello/config.json already exists.\n'
  printf '       Delete it to recreate the board from scratch.\n'
  exit 0
fi

if ! command -v jq &>/dev/null; then
  printf '\033[0;31m[ERROR]\033[0m jq is required. Install it first.\n' >&2
  exit 1
fi

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

BOLD='\033[1m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
RED='\033[0;31m'
RESET='\033[0m'

ok()   { printf "${GREEN}✓${RESET}  %s\n" "$*"; }
info() { printf "${CYAN}→${RESET}  %s\n"  "$*"; }
fail() { printf "${RED}✗${RESET}  %s\n"   "$*" >&2; exit 1; }

composio_exec() {
  local tool="$1" payload="$2"
  local result
  result=$("$COMPOSIO" execute "$tool" -d "$payload" 2>&1)
  local success
  success=$(printf '%s' "$result" | jq -r '.successful // false' 2>/dev/null)
  if [ "$success" != "true" ]; then
    local err
    err=$(printf '%s' "$result" | jq -r '.error // .message // "unknown"' 2>/dev/null || printf '%s' "$result")
    fail "Composio call failed ($tool): $err"
  fi
  printf '%s' "$result"
}

# ---------------------------------------------------------------------------
# Banner
# ---------------------------------------------------------------------------

printf '\n'
printf "${BOLD}╔══════════════════════════════════════════════╗${RESET}\n"
printf "${BOLD}║   CI Consulting War Room — Trello Setup      ║${RESET}\n"
printf "${BOLD}╚══════════════════════════════════════════════╝${RESET}\n\n"

# ---------------------------------------------------------------------------
# 1. Create board
# ---------------------------------------------------------------------------

info "Creating board: CI Consulting War Room..."
board_result=$(composio_exec TRELLO_ADD_BOARDS \
  '{"name": "CI Consulting War Room", "desc": "Operations board for CI Consulting agents"}')
BOARD_ID=$(printf '%s' "$board_result" | jq -r '.data.id')
[ -z "$BOARD_ID" ] && fail "Could not extract board ID"
ok "Board created: $BOARD_ID"

# ---------------------------------------------------------------------------
# 2. Create lists (order: Backlog first → ends up top-to-bottom correctly)
# ---------------------------------------------------------------------------

info "Creating pipeline lists..."

create_list() {
  local name="$1"
  local payload
  payload=$(jq -n --arg n "$name" --arg b "$BOARD_ID" '{name: $n, idBoard: $b}')
  local result
  result=$(composio_exec TRELLO_ADD_LISTS "$payload")
  printf '%s' "$result" | jq -r '.data.id'
}

LIST_BACKLOG=$(create_list "📋 Backlog")
ok "List created: 📋 Backlog ($LIST_BACKLOG)"

LIST_IN_PROGRESS=$(create_list "⚡ In Progress")
ok "List created: ⚡ In Progress ($LIST_IN_PROGRESS)"

LIST_REVIEW=$(create_list "👀 Review")
ok "List created: 👀 Review ($LIST_REVIEW)"

LIST_COMPLETED=$(create_list "✅ Completed")
ok "List created: ✅ Completed ($LIST_COMPLETED)"

# ---------------------------------------------------------------------------
# 3. Create agent labels on the board
# ---------------------------------------------------------------------------

info "Creating agent labels..."

create_label() {
  local name="$1" color="$2"
  local payload
  payload=$(jq -n --arg n "$name" --arg c "$color" --arg b "$BOARD_ID" \
    '{name: $n, color: $c, idBoard: $b}')
  local result
  result=$(composio_exec TRELLO_CREATE_BOARD_LABEL "$payload")
  printf '%s' "$result" | jq -r '.data.id'
}

LABEL_SCAN=$(create_label "🎯 Scan" "green")
ok "Label: 🎯 Scan (green) → $LABEL_SCAN"

LABEL_QUILLY=$(create_label "✍️ Quilly" "orange")
ok "Label: ✍️ Quilly (orange) → $LABEL_QUILLY"

LABEL_OVI=$(create_label "🔍 Ovi" "sky")
ok "Label: 🔍 Ovi (blue) → $LABEL_OVI"

LABEL_LARRY=$(create_label "💰 Larry" "red")
ok "Label: 💰 Larry (red) → $LABEL_LARRY"

LABEL_CLEO=$(create_label "💎 Cleo" "purple")
ok "Label: 💎 Cleo (purple) → $LABEL_CLEO"

# ---------------------------------------------------------------------------
# 4. Write config.json
# ---------------------------------------------------------------------------

info "Writing trello/config.json..."

jq -n \
  --arg board_id     "$BOARD_ID" \
  --arg backlog      "$LIST_BACKLOG" \
  --arg in_progress  "$LIST_IN_PROGRESS" \
  --arg review       "$LIST_REVIEW" \
  --arg completed    "$LIST_COMPLETED" \
  --arg scan         "$LABEL_SCAN" \
  --arg quilly       "$LABEL_QUILLY" \
  --arg ovi          "$LABEL_OVI" \
  --arg larry        "$LABEL_LARRY" \
  --arg cleo         "$LABEL_CLEO" \
  --arg created_at   "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  '{
    board_id: $board_id,
    lists: {
      backlog:     $backlog,
      in_progress: $in_progress,
      review:      $review,
      completed:   $completed
    },
    labels: {
      scan:   $scan,
      quilly: $quilly,
      ovi:    $ovi,
      larry:  $larry,
      cleo:   $cleo
    },
    created_at: $created_at
  }' > "$CONFIG_FILE"

ok "Config written to trello/config.json"

# ---------------------------------------------------------------------------
# 5. Init card cache
# ---------------------------------------------------------------------------

mkdir -p "$CACHE_DIR"
echo '{}' > "$CACHE_DIR/cards.json"
ok "Card cache initialized"

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------

printf '\n'
printf "${BOLD}Setup complete!${RESET}\n\n"
printf "  Board ID:       %s\n" "$BOARD_ID"
printf "  Lists:          Backlog | In Progress | Review | Completed\n"
printf "  Agent labels:   Scan | Quilly | Ovi | Larry | Cleo\n"
printf '\n'
printf "Run an agent to create your first task:\n"
printf "  ./trello/agents/quilly.sh task \"My first task\" \"Description\" \"\"\n\n"
