const crypto = require("crypto");

export const encrypt = (value) => {
  try {
    var mykey = crypto.createCipher("aes-128-cbc", process.env.PLAIN_TEXT);
    var mystr = mykey.update(JSON.stringify(value), "utf-8", "hex");
    mystr += mykey.final("hex");
    return mystr;
  } catch (err) {
    return err;
  }
};

export const decrypt = (value) => {
  try {
    try {
      var mykey = crypto.createDecipher("aes-128-cbc", process.env.PLAIN_TEXT);
      var mystr = mykey.update(value, "hex", "utf8");
      mystr += mykey.final("utf8");
      return mystr;
    } catch (err) {
      return err;
    }
  } catch (err) {
    return err;
  }
};
