FROM --platform=linux/amd64 node:lts-bookworm-slim
SHELL ["/bin/bash", "-c"]
RUN apt update && apt install -y curl bash git tar gzip libc++-dev unzip

# Switch to non-root user (vscode is the default user in devcontainers)
USER vscode

# Install noir
RUN curl -L https://raw.githubusercontent.com/noir-lang/noirup/refs/heads/main/install | bash

# Add noir to PATH - this is necessary because the installation adds it to .bashrc
ENV PATH="/home/vscode/.noir/bin:${PATH}"

# Run noirup
RUN /home/vscode/.noir/bin/noirup
RUN curl -L https://raw.githubusercontent.com/AztecProtocol/aztec-packages/refs/heads/master/barretenberg/bbup/install | bash
RUN /home/vscode/.noir/bin/bbup
