FROM --platform=linux/amd64 node:lts-bookworm-slim
SHELL ["/bin/bash", "-c"]
RUN apt update && apt install -y curl bash git tar gzip libc++-dev unzip

RUN curl -L https://raw.githubusercontent.com/noir-lang/noirup/refs/heads/main/install | bash && source /root/.bashrc
RUN noirup

RUN curl -L https://raw.githubusercontent.com/AztecProtocol/aztec-packages/refs/heads/master/barretenberg/bbup/install | bash && source /root/.bashrc && bbup && nargo --version && bb --version