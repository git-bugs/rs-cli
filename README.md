## **Test**

Run all tests `npm test`
Test coverage `npm run test:coverage`

---

## **Ciphering CLI Tool**
---
The application uses three types of cipher: 
* **Caesar**
* **Atbash**
* **ROT-8**

To start the application : `$ node app <options>`

Where `<options>`:
  1. `-c`,`--config`: **required option**, config is a string with pattern `{XY(-)}n`, where:
  * `X`is a cipher mark:
    * `C` is for Caesar cipher (with shift 1)
    * `A` is for Atbash cipher
    * `R` is for ROT-8 cipher
  * `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
    * `1` is for encoding
    * `0` is for decoding
  2. `-i`, `--input`: a path to input file
  3. `-o`, `--output`: a path to output file

  Example config `"A-C1-R1"` means "Atbash cipher => encode by Caesar cipher => encode by ROT-8"
