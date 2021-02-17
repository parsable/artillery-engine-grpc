# artillery-engine-grpc-js

Load test gRPC application with [Artillery.io](https://artillery.io/)

## Documentation

For users:

- [Documentation](https://kenju.github.io/artillery-engine-grpc/documentation)

For developers:

- [Development Guide](https://kenju.github.io/artillery-engine-grpc/development_guide)

## Usage

### Install the plugin

```sh
# if `artillery` is installed globally
yarn add artillery-engine-grpc-js
```

### Define your scenario

#### .proto file

```proto
syntax = "proto3";

package backend.services.v1;

service HelloService {
    rpc Hello (HelloRequest) returns (HelloResponse) {
    }
}

message HelloRequest {
    int32 id = 1;
    string name = 2;
}

message HelloResponse {
    string message = 1;
}
```

#### scenario file

```yml
config:
  target: 127.0.0.1:8080
  phases:
    - duration: 10
      arrivalRate: 10
      pause: 15
  engines:
    grpc-js:
      channelOpts:
        grpc.client_idle_timeout_ms: 1000
      protobufDefinition:
        filepath: protobuf-definitions/backend/services/v1/hello.proto
        package: backend.services.v1
        service: HelloService
      protoLoaderConfig:
        keepCase: true
        longs: String
        enums: String
        bytes: Buffer
        defaults: false
        arrays: false
        objects: false
        oneofs: true
        includeDirs: []
      metadata:
        "user-id": u123

scenarios:
  - name: test backend-service running at http://localhost:8080
    engine: grpc-js
    flow:
    # list RPC names with its arguments
    - Hello:
        id: 1
        name: Alice
    - Hello:
        id: 2
        name: Bob
    - Hello:
        id: 3
        name: Chris

```

### Run the scenario

```
artillery run my-scenario.yml
```

## License

[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
