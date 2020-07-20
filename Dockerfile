FROM alpine:3.12 AS permissions-giver

# Make sure docker-entrypoint.sh is executable, regardless of the build host.
WORKDIR /out
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

FROM alpine:3.12 AS organizer

# Installation files
WORKDIR /out/usr/src/install
COPY src src
COPY mod.ts .

# Default configuration
WORKDIR /out/pagic
RUN echo "export default {}" > pagic.config.ts

FROM hayd/alpine-deno:1.2.0 AS runner
COPY --from=organizer /out /

# Install
WORKDIR /usr/src/install
ENV PATH "/root/.deno/bin:$PATH"
RUN deno install --unstable --allow-read --allow-write --allow-net -n pagic mod.ts \
  # Install dependencies
  && deno cache --unstable $(find src -name "*.ts*")

WORKDIR /pagic
COPY --from=permissions-giver /out/docker-entrypoint.sh /usr/local/bin
ENTRYPOINT [ "docker-entrypoint.sh" ]
CMD [ "build" ]