/**
 * Construct the template's full name (e.g.: namespace/myTemplate)
 * @method getFullName
 * @param  {Object}       config
 * @param  {String}       config.name       Template name
 * @param  {String}       config.namespace  Template namespace
 * @return {String}                         Returns the template full name
 */
const getFullName = (config) => {
  let { name, namespace } = config;
  let fullName = name;

  if (namespace && namespace !== 'default') {
    fullName = `${namespace}/${name}`;
  }

  return fullName;
};

const templatesFormatter = (templates) => {
  templates.forEach((t) => {
    // Add full template name
    t.fullName = getFullName({
      name: t.name,
      namespace: t.namespace
    });
  });

  return templates;
};

export default { getFullName, templatesFormatter };
