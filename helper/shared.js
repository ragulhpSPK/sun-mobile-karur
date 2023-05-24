const crypto = require("crypto");

export const excrypt = (value) => {
  console.log(value, "value");
  try {
    var mykey = crypto.createCipheriv("aes-128-cbc", process.env.PLAIN_TEXT);
    var mystr = mykey.update(jSON.stringify(value), "utf-8", "hex");
    mystr += mykey.final("hex");
    return mystr;
  } catch (err) {
    console.log(err);
  }
};

export const decrypt = (value) => {
  try {
    var mykey = crypto.createDecipheriv("aes-128-cbc", process.env.PLAIN_TEXT);
    var mystr = mykey.update(jSON.stringify(value), "hex", "utf8");
    mystr += mykey.final("utf8");
    return mystr;
  } catch (err) {
    console.log(err);
  }
};
