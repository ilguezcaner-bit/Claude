#!/usr/bin/env bash
# 🎯 Scan — Commander & Orchestrator
# Manages and delegates tasks across all CI Consulting agents.
set -euo pipefail

AGENT_NAME="scan"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/../lib/trello.sh"

banner() {
  printf '\033[0;32m'
  printf '╔══════════════════════════════════════════╗\n'
  printf '║  🎯 SCAN  •  Commander & Orchestrator    ║\n'
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
  printf '  %s assign  "<title>" "<agent>"\n' "$0"
  printf '\n'
  printf 'Agents: scan | quilly | ovi | larry | cleo\n'
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
    trello_info "Creating task: $TITLE"
    CARD_ID=$(trello_create_card "$TITLE" "$DESC" "$DUE" \
      "$(trello_list_id backlog)" "$(trello_label_id $AGENT_NAME)")
    trello_ok "Card created → $CARD_ID"
    trello_info "Added to: 📋 Backlog  |  Label: 🎯 Scan"
    ;;
  start)
    [ $# -lt 2 ] && usage
    banner
    TITLE="${2}"
    trello_info "Moving to In Progress: $TITLE"
    CARD_ID=$(trello_find_card "$TITLE")
    trello_move_card "$CARD_ID" "$(trello_list_id in_progress)"
    trello_ok "Moved to: ⚡ In Progress"
    ;;
  review)
    [ $# -lt 2 ] && usage
    banner
    TITLE="${2}"
    trello_info "Moving to Review: $TITLE"
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
    trello_comment_card "$CARD_ID" "🎯 Scan: $TEXT"
    trello_ok "Comment added"
    ;;
  assign)
    [ $# -lt 3 ] && usage
    banner
    TITLE="${2}" AGENT="${3}"
    # Validate agent name
    case "$AGENT" in
      scan|quilly|ovi|larry|cleo) ;;
      *) trello_error "Unknown agent: $AGENT. Use: scan|quilly|ovi|larry|cleo"; exit 1 ;;
    esac
    trello_info "Assigning \"$TITLE\" to $AGENT"
    CARD_ID=$(trello_find_card "$TITLE")
    trello_relabel_card "$CARD_ID" "$(trello_label_id $AGENT)"
    trello_comment_card "$CARD_ID" "🎯 Scan assigned this task to $AGENT"
    trello_ok "Assigned to: $AGENT"
    ;;
  *)
    usage
    ;;
esac
