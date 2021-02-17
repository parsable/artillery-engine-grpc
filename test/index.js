'use strict';

const test = require('tape');
const EventEmitter = require('events');

const ArtilleryGRPCEngine = require('..');

const script = {
    config: {
      target: 'my_awesome_grpc_host',
      engines: {
        'grpc-js': {
          channelOpts: {
            'grpc.client_idle_timeout_ms': 1000
          },
          protobufDefinition: {
            filepath: './test/proto/greeter.proto',
            package: 'grpc.greeter',
            service: 'Greeter'
          }
        }
      }
    },
    scenarios: [
      {
        name: 'Call gRPC unary',
        engine: 'grpc-js',
        flow: [
          {
            Greet: {
              greeting: {
                  first_name: 'Foo',
                  last_name: 'Bar'
              }
            }
          }
        ]
      }
    ]
};

test('Engine interface', function (t) {
  const events = new EventEmitter();
  const engine = new ArtilleryGRPCEngine(script, events, {});
  const scenario = engine.createScenario(script.scenarios[0], events);
  t.assert(engine, 'Can construct an engine');
  t.assert(typeof scenario === 'function', 'Can create a scenario');
  t.end();
});
