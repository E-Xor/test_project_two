#!/bin/bash

RUN_UNICORN="bundle exec unicorn -c ./config/unicorn/unicorn_test_project_two_config.rb"
RUN_UNICORN_BG="bundle exec unicorn -c ./config/unicorn/unicorn_test_project_two_config.rb -D"
UNICORN_PID_FILE="/tmp/unicorn_test_project_two.pid"

case "$1" in
-f)
  echo "Running unicorn in the foreground"
  echo "Ctrl+C to stop"
  $RUN_UNICORN
  ;;
-k)
  echo "Killing unicorn"
  echo $(cat "$UNICORN_PID_FILE")
  kill -TERM $(cat "$UNICORN_PID_FILE")
  ;;
*)
  echo "Running unicorn in the background. To stop:"
  echo "$0 -k"
  $RUN_UNICORN_BG
  ;;
esac

sleep 1
echo "Checking unicorns in your memory"
ps uax | grep unicorn
