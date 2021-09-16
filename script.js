import http from 'k6/http'
import { check, sleep } from 'k6'

export let options = {
	vus: 10,
	duration: '60s',
	// stages: [
	// 	{ duration: '20m', target: 200 },
	// 	{ duration: '35m', target: 500 },
	// 	{ duration: '15m', target: 250},
	// ],
	thresholds: {
		http_req_duration: ['p(90)<200']
	}
}

export default function() {
	let url = 'https://api.megasac.tallos.com.br/login'
	let payLoad = JSON.stringify({
		email: 'errado@errado.com',
		password: '123hnd',
	})

	let params = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	let res = http.post(url, payLoad, params)
	check(res, { 'Status HTTP foram 404': (r) => r.status == 404 })
	sleep(0.2)
}


// import http from "k6/http";
// import { check, sleep } from "k6";
// import { Counter, Rate } from "k6/metrics";

// let ErrorCount = new Counter("errors");
// let ErrorRate = new Rate("error_rate");

// export let options = {
//   stages: [
//     { duration: '2m', target: 10 },
//     { duration: '5m', target: 10 },
//     { duration: '2m', target: 20 },
//     { duration: '5m', target: 20 },
//     { duration: '2m', target: 30 },
//     { duration: '5m', target: 30 },
//     { duration: '2m', target: 40 },
//     { duration: '5m', target: 40 },
//     { duration: '10m', target: 0 },
    
//   ],
//   thresholds: {
//     error_rate: ["rate<0.1"]
//   }
// };

// export default function() {
//   const status = Math.random() < 0.9 ? "200" : "500";
//   let res = http.get(`http://httpbin.org/status/${status}`);
//   let success = check(res, {
//     "status is 200": r => r.status === 200
//   });
//   if (!success) {
//     ErrorCount.add(1);
//     ErrorRate.add(true);
//   } else {
//     ErrorRate.add(false);
//   }

//   sleep(0.5);
// }
