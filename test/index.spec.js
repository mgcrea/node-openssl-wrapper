
import fs from 'fs';
import expect from 'expect';
import opensslWrapper from './../src';

describe('openssl-wrapper', () => {
  it('should throw if no action is passed', () => {
    expect(() => opensslWrapper()).toThrow();
  });
  it('should support genrsa action', (done) => {
    const pass = 'foobar';
    opensslWrapper('genrsa', {des3: true, passout: `pass:${pass}`, 1024: false}, (err, obj) => {
      expect(err).toBe(null);
      expect(obj).toBeA(Buffer);
      done();
    });
  });
  it('should support smime.verify action', (done) => {
    const buffer = fs.readFileSync(`${__dirname}/fixtures/signed.mobileprovision`);
    opensslWrapper('smime.verify', buffer, {inform: 'DER', noverify: true}, (err, obj) => {
      expect(err).toBe(null);
      expect(obj).toBeA(Buffer);
      done();
    });
  });
  it('should support x509 action', (done) => {
    const buffer = fs.readFileSync(`${__dirname}/fixtures/AppleIncRootCertificate.cer`);
    opensslWrapper('x509', buffer, {noout: true, subject: true, inform: 'DER'}, (err, obj) => {
      expect(err).toBe(null);
      expect(obj).toBeA(Buffer);
      done();
    });
  });
});
