/*
This file is part of the Juju GUI, which lets users view and manage Juju
environments within a graphical interface (https://launchpad.net/juju-gui).
Copyright (C) 2012-2013 Canonical Ltd.

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License version 3, as published by
the Free Software Foundation.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranties of MERCHANTABILITY,
SATISFACTORY QUALITY, or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero
General Public License for more details.

You should have received a copy of the GNU Affero General Public License along
with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';


describe('container token view', function() {
  var Y, container, machine, models, utils, views, view, View;

  before(function(done) {
    Y = YUI(GlobalConfig).use(['container-token',
                               'juju-models',
                               'juju-views',
                               'juju-tests-utils',
                               'event-simulate',
                               'node-event-simulate',
                               'node'], function(Y) {

      models = Y.namespace('juju.models');
      utils = Y.namespace('juju-tests.utils');
      views = Y.namespace('juju.views');
      View = views.ContainerToken;
      done();
    });
  });

  beforeEach(function() {
    container = utils.makeContainer(this, 'container-token');
    machine = {
      title: 'test title'
    };
    view = new View({
      containerParent: container,
      machine: machine
    }).render();
  });

  afterEach(function() {
    view.destroy();
    container.remove(true);
  });

  it('should apply the wrapping class to the container', function() {
    assert.equal(container.one('> div').hasClass('container-token'), true);
  });

  it('fires the delete event', function(done) {
    view.on('deleteToken', function(e) {
      assert.isObject(e);
      done();
    });
    container.one('.delete').simulate('click');
  });
});
