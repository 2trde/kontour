import {getAttribute, setAttribute} from '../src/ObjectHelper'
import expect from 'expect'

describe('ObjectHelper', () => {
  describe('getAttribute', () => {
    it('simple case', () => {
      const obj = {
        foo: 'bar',
        bla: 'blub'
      }
      expect(getAttribute(obj, 'foo')).toBe('bar')
      expect(getAttribute(obj, 'bla')).toBe('blub')
    });

    it('deep access case', () => {
      const obj = {
        foo: 'bar',
        bla: 'blub',
        deep: {
          val: 'its deep',
          deeper: {
            val: 'its super deep'
          }
        }
      }
      expect(getAttribute(obj, 'deep.val')).toBe('its deep')
      expect(getAttribute(obj, 'deep.deeper.val')).toBe('its super deep')
    });
  })
  describe('setAttribute', () => {
    it('simple case', () => {
      const obj = {
        foo: 'bar',
        bla: 'blub'
      }
      const newObj = setAttribute(obj, 'foo', 'bar2')
      expect(obj.foo).toBe('bar')
      expect(newObj.foo).toBe('bar2')
    });
    it('deep case', () => {
      const obj = {
        foo: 'bar',
        bla: {
          peng: 'boom'
        }
      }
      const newObj = setAttribute(obj, 'bla.peng', 'bam')
      expect(obj.bla.peng).toBe('boom')
      expect(newObj.bla.peng).toBe('bam')
    });
  })
})

