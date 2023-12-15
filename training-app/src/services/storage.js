import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

/**
* @param {string} path
* @param {file} file
* @returns {Promise}
*/
export async function uploadFile(path, file) {
    const fileRef = ref(storage, path);
    return uploadBytes(fileRef, file);
}

/**
 * Retorna la URL del archivo.
 * 
 * @param {File} path 
 * @returns {Promise<string>}
 */
export async function getFileURL(path) {
    return getDownloadURL(ref(storage, path));
}

/**
* Elimina un archivo del almacenamiento.
*
* @param {string} path Ruta del archivo en el almacenamiento.
* @returns {Promise}
*/
export async function deleteFile(path) {
    const fileRef = ref(storage, path);
  
    try {
      await deleteObject(fileRef);
      console.log('Archivo eliminado con éxito:', path);
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
      throw error;
    }
}

export async function loadImage(file, field, target) {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
  target[field] = reader.result;
  });
  return reader.readAsDataURL(file);
}