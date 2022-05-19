import { Pipe, PipeTransform } from '@angular/core';
import { ImagePreview } from '@app/shared/images-preview/image-preview';

//impure because of the previews which is updated in an async function (not detected as it is array)
@Pipe({ name: 'imagePipe', pure: false })
export class ImagePipe implements PipeTransform {
  transform(selectedImage: any, previews: ImagePreview[], defaultImage: string) {
    return (selectedImage =
      previews.length > 0
        ? previews.find((image) => image.name === selectedImage?.name)?.url || previews[0].url
        : defaultImage);
  }
}
