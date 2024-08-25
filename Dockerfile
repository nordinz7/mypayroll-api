FROM oven/bun:1.0.25

LABEL maintainer="Nordin <vipnordin@gmail.com>"

ENV APP_HOME=/code

WORKDIR $APP_HOME

COPY package.json $APP_HOME

RUN bun install

COPY . $APP_HOME

EXPOSE 8000

CMD ["bun", "run", "--watch", "src/index.ts"]
