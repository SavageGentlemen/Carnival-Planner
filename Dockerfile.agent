FROM python:3.11-slim
# Install Rust and required build tools
RUN apt-get update && apt-get install -y curl build-essential git
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Clone and install the Claw Code framework
RUN git clone https://github.com/instructkr/claw-code.git /opt/claw-code
WORKDIR /opt/claw-code

# Install Python dependencies (from src or root)
RUN if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
RUN if [ -d src ] && [ -f src/requirements.txt ]; then pip install -r src/requirements.txt; fi

# Build the Rust component
WORKDIR /opt/claw-code/rust
RUN if [ -f Cargo.toml ]; then cargo build --release; fi
