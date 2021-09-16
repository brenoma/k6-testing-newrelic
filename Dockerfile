ARG GOSTATSD_TAG=latest

FROM newrelic/nri-statsd:$GOSTATSD_TAG

ENV NR_ACCOUNT_ID=<USER-KEY>

ENV NR_API_KEY="<API-KEY>"

EXPOSE 8125:8125/udp

COPY ./nri-statsd.sh .

ENTRYPOINT ["/nri-statsd.sh"]
