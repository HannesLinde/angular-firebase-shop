import { Pipe, PipeTransform } from '@angular/core';
import { encodeUrl } from '@app/core/helpers/encoder-decoder';
import { ImagePreview } from '@app/shared/images-preview/image-preview';
import { environment } from '../../environments/environment';

//impure because of the previews which is updated in an async function (not detected as it is array)
@Pipe({ name: 'imageUrlPipe', pure: false })
export class ImageUrlPipe implements PipeTransform {
  transform(
    relativeImagePath: string | undefined,
    imageStorageFolder: string,
    defaultImage: string,
    dataPath: string | undefined
  ) {
    const fileStoragePath = dataPath
      ? `${imageStorageFolder}${dataPath}/${relativeImagePath}`
      : `${imageStorageFolder}${relativeImagePath}`;
    return relativeImagePath ? encodeUrl(environment.firebase.storageBucket, fileStoragePath) : defaultImage;
  }
}
