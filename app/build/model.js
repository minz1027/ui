import DS from 'ember-data';
import Ember from 'ember';

/**
 * Calulate ms difference between two times
 * @method calcDuration
 * @param  {String}         start key for start time
 * @param  {String}         end   key for end time
 * @return {Number}               ms difference
 */
function calcDuration(start, end) {
  let endTime = new Date();
  let startTime;

  if (end !== 'now') {
    endTime = this.get(end);
  }

  startTime = this.get(start);

  if (!startTime || !endTime) {
    return 0;
  }

  return endTime.getTime() - startTime.getTime();
}

/**
 * Gets human readable text for a duration
 * @method durationText
 * @param  {String}         start key for start time
 * @param  {String}         end   key for end time
 * @return {String}               human readable text for duration
 */
function durationText(start, end) {
  return humanizeDuration(calcDuration.call(this, start, end), { round: true, largest: 1 });
}

export default DS.Model.extend({
  // ember-data has some reservations with the "container" attribute name
  buildContainer: DS.attr('string'),
  buildDuration: Ember.computed('startTime', 'endTime', {
    get() {
      return durationText.call(this, 'startTime', 'endTime');
    }
  }),
  cause: DS.attr('string'),
  commit: DS.attr(),
  createTime: DS.attr('date'),
  createTimeWords: Ember.computed('createTime', {
    get() {
      const dt = durationText.call(this, 'createTime', 'now');

      return `${dt} ago`;
    }
  }),
  endTime: DS.attr('date'),
  eventId: DS.attr('string'),
  jobId: DS.attr('string'),
  meta: DS.attr(),
  number: DS.attr('number'),
  parameters: DS.attr(),
  parentBuildId: DS.attr('string'),
  queuedDuration: Ember.computed('createTime', 'startTime', {
    get() {
      return durationText.call(this, 'createTime', 'startTime');
    }
  }),
  sha: DS.attr('string'),
  startTime: DS.attr('date'),
  status: DS.attr('string'),
  steps: DS.attr(),
  totalDurationMS: Ember.computed('createTime', 'endTime', {
    get() {
      return calcDuration.call(this, 'createTime', 'endTime');
    }
  }),
  truncatedSha: Ember.computed('sha', {
    get() {
      return this.get('sha').substr(0, 6);
    }
  })
});
