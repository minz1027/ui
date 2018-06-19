import { resolve } from 'rsvp';
import Service from '@ember/service';
import { moduleFor, test } from 'ember-qunit';

const createTime = '2016-09-23T16:53:00.274Z';
const commandServiceStub = Service.extend({
  getOneCommand(namespace, name) {
    return resolve([
      { id: 3, namespace, name, version: '3.0.0', createTime },
      { id: 2, namespace, name, version: '2.0.0', createTime },
      { id: 1, namespace, name, version: '1.0.0', createTime }
    ]);
  }
});

moduleFor('route:commands/detail', 'Unit | Route | commands/detail', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  beforeEach: function beforeEach() {
    this.register('service:command', commandServiceStub);
  }
});

test('it asks for the list of commands for a given namespace and name', function (assert) {
  let route = this.subject();
  const commandCreateTime = new Date(createTime).getTime();

  assert.ok(route);

  return route.model({ namespace: 'foo', name: 'bar' }).then((commands) => {
    assert.equal(commands[0].name, 'bar');
    assert.equal(commands[0].namespace, 'foo');
    assert.equal(commands[0].lastUpdated,
      `${humanizeDuration(Date.now() - commandCreateTime, { round: true, largest: 1 })} ago`);
  });
});
