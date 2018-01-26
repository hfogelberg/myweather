const parseAddress = (addressComponents) => {
  let name = "";
  let hasName = false;

  addressComponents.forEach((component) => {
    let ct = component.types[0];
    if (ct === "postal_town") {
      name = component.short_name;
      hasName = true;
    }
    if (ct === "locality" && !hasName) {
      name = component.short_name;
      hasName = true;
    }
    if (ct == "administrative_area_level_1" && !hasName) {
      name = component.short_name;
      hasName = true;
    }
    if (ct == "administrative_area_level_2" && !hasName) {
      name = component.short_name;
      hasName = true;
    }
  });

  return name;
};

module.exports = {parseAddress};