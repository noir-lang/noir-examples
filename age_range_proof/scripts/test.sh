#!/bin/bash
set -e

# List of test ages and expected result: pass or fail
declare -A tests=(
  [17]="fail"
  [18]="pass"
  [35]="pass"
  [60]="pass"
  [61]="fail"
)

for age in "${!tests[@]}"; do
  echo "▶️ Testing age=$age (expected to ${tests[$age]})"

  if [ "${tests[$age]}" = "pass" ]; then
    ./scripts/build.sh $age
    echo "✅ Passed as expected"
  else
    # For expected failures, capture error but don't exit script
    if ./scripts/build.sh $age 2>/dev/null; then
      echo "❌ Test failed: age=$age was expected to fail but passed"
      exit 1
    else
      echo "✅ Failed as expected"
    fi
  fi

  echo ""
done

echo "🎉 All tests completed."
