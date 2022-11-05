const uppercase = (name) => {
  let nameArr = name.split(' ');
  if (nameArr.length === 1) {
    let lowercase = name.toLowerCase();
    return lowercase[0].toUpperCase() + lowercase.substring(1);
  } else {
    let upperArr = nameArr.map((word) => {
      let lowercase = word.toLowerCase();
      return lowercase[0].toUpperCase() + lowercase.substring(1);
    });
    let finalword = upperArr.join(' ');
    return finalword;
  }
};

export default uppercase;
