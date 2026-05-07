#!/usr/bin/env bash
# 💎 Cleo — Client Success
# Client onboarding, reporting, communication, satisfaction tracking.
set -euo pipefail

AGENT_NAME="cleo"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/../lib/trello.sh"

banner() {
  printf '\033[0;35m'
  printf '╔══════════════════════════════════════════╗\n'
  printf '║  💎 CLEO  •  Client Success              ║\n'
  printf '║  CI Consulting War Room                  ║\n'
  printf '╚══════════════════════════════════════════╝\n'
  printf '\033[0m\n'
}

usage() {
  printf 'Usage:\n'
  printf '  %s task    "<title>" "<desc>" "<due_date>"\n' "$0"
  printf '  %s start   "<title>"\n' "$0"
  printf '  %s review  "<title>"\n' "$0"
  printf '  %s done    "<title>"\n' "$0"
  printf '  %s comment "<title>" "<comment>"\n' "$0"
  printf '\n'
  printf 'due_date: ISO 8601 (e.g. 2026-05-15) or empty string\n'
  exit 1
}

CMD="${1:-}"
[ -z "$CMD" ] && usage

case "$CMD" in
  task)
    [ $# -lt 2 ] && usage
    banner
    TITLE="${2:-}" DESC="${3:-}" DUE="${4:-}"
    trello_info "Creating client task: $TITLE"
    CARD_ID=$(trello_create_card "$TITLE" "$DESC" "$DUE" \
      "$(trello_list_id backlog)" "$(trello_label_id $AGENT_NAME)")
    trello_ok "Card created → $CARD_ID"
    trello_info "Added to: 📋 Backlog  |  Label: 💎 Cleo"
    ;;
  start)
    [ $# -lt 2 ] && usage
    banner
    TITLE="${2}"
    trello_info "Starting: $TITLE"
    CARD_ID=$(trello_find_card "$TITLE")
    trello_move_card "$CARD_ID" "$(trello_list_id in_progress)"
    trello_ok "Moved to: ⚡ In Progress"
    ;;
  review)
    [ $# -lt 2 ] && usage
    banner
    TITLE="${2}"
    trello_info "Submitting for review: $TITLE"
    CARD_ID=$(trello_find_card "$TITLE")
    trello_move_card "$CARD_ID" "$(trello_list_id review)"
    trello_ok "Moved to: 👀 Review"
    ;;
  done)
    [ $# -lt 2 ] && usage
    banner
    TITLE="${2}"
    trello_info "Completing: $TITLE"
    CARD_ID=$(trello_find_card "$TITLE")
    trello_move_card "$CARD_ID" "$(trello_list_id completed)"
    trello_ok "Moved to: ✅ Completed"
    ;;
  comment)
    [ $# -lt 3 ] && usage
    banner
    TITLE="${2}" TEXT="${3}"
    trello_info "Adding comment to: $TITLE"
    CARD_ID=$(trello_find_card "$TITLE")
    trello_comment_card "$CARD_ID" "💎 Cleo: $TEXT"
    trello_ok "Comment added"
    ;;
  *)
    usage
    ;;
esac
