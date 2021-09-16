import http from "k6/http";
import { check, sleep } from "k6";
import { Counter, Rate } from "k6/metrics";

let ErrorCount = new Counter("errors");
let ErrorRate = new Rate("error_rate");

export let options = {
  stages: [
    { duration: '15s', target: 200 },
    { duration: '1m40s', target: 200 },
    { duration: '15s', target: 0 },
  ],
  thresholds: {
    error_rate: ["rate<0.1"]
  }
};

export default function() {
  const status = Math.random() < 0.9 ? "200" : "500";
  let res = http.get(`http://httpbin.org/status/${status}`);
  let success = check(res, {
    "status is 200": r => r.status === 200
  });
  if (!success) {
    ErrorCount.add(1);
    ErrorRate.add(true);
  } else {
    ErrorRate.add(false);
  }

  sleep(0.5);
}
