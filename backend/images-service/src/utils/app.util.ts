type BodyFields = {
  [key: string]: string | number | boolean | null | undefined;
};

/**
 * Obtiene los campos del formulario a partir de un objeto de datos.
 * @param data Objeto que contiene los campos del formulario.
 * @returns Un objeto que contiene los campos del formulario.
 * @example
 * const data = {
 *   fields: {
 *     uuid: { value: '12345' },
 *     listingUuid: { value: '67890' },
 *   },
 * };
 * const fields = getFields(data);
 * console.log(fields); // { uuid: '12345', listingUuid: '67890' }
 */
export const getFields = (data: any) => {
  const fields = data.fields as any as {
    [key in keyof BodyFields]: {
      value: BodyFields[key];
    };
  };
  return fields;
};

/**
 * Genera el path para la carga de archivos en S3.
 * @param data Objeto que contiene los campos del formulario.
 * @param directories Array de strings que representan los directorios en S3.
 * @returns El path generado para la carga de archivos.
 * @example
 * const data = {
 *   fields: {
 *     uuid: { value: '12345' },
 *     listingUuid: { value: '67890' },
 *   },
 * };
 * const directories = ['users', 'uuid', 'listings', 'listing-uuid'];
 * const path = getPath(data, directories);
 * console.log(path); // 'users/12345/listings/67890'
 */
export const getPath = (data: any, directories: Array<string>): string => {
  const fields = getFields(data);

  // Genera el path basado en los directorios y los campos.
  // Se evalúa cada string del array directories,
  // si el campo existe en fields, se usa su valor,
  // Si no existe el campo, se usa el string del array como valor.
  const path = directories
    .map(directory => (fields[directory] ? fields[directory].value : directory))
    .join('/');
  return path;
};
