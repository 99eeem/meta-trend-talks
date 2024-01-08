FROM python:3.9.10-slim-buster as builder
ENV WORKDIR /app/
WORKDIR ${WORKDIR}
# pipをインストールまたはアップデート
RUN pip install --upgrade pip
# poetryインストール時に依存関係の衝突を起こす可能性があるため、version指定でインストール
ENV POETRY_VERSION 1.1.11
ADD https://raw.githubusercontent.com/python-poetry/poetry/${POETRY_VERSION}/get-poetry.py ./get-poetry.py
# ライブラリの依存関係を定義したファイルをdockerイメージ側のwork directoryにコピー
COPY ./lambda-layer/libs/pyproject.toml  ${WORKDIR}
# poetryをインストール
RUN python get-poetry.py
RUN /root/.poetry/bin/poetry config --local virtualenvs.create false
# development環境builder用
FROM builder as dev_builder
RUN /root/.poetry/bin/poetry install
# development環境runner用
FROM python:3.9.10-slim-buster as dev
ENV WORKDIR /app/
WORKDIR ${WORKDIR}
COPY --from=dev_builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=dev_builder /usr/local/bin/py.test /usr/local/bin/py.test
COPY --from=dev_builder /usr/local/bin/pytest /usr/local/bin/pytest
COPY --from=dev_builder /root/.poetry /root/.poetry
COPY --from=dev_builder /root/.poetry/bin/poetry /root/.poetry/bin/poetry
