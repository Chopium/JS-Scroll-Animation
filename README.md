# ScrollAnimation

ScrollAnimation is a JavaScript class that allows you to create scroll-based image sequence animations. It offers a simple way to animate images based on the scroll position of the page. The animation can be set to play once, repeatedly, or in a back-and-forth (yoyo) manner.

[Scroll Animation Example](https://jellybean.web.illinois.edu/e7_scroll/)

## Features
- Smoothly animates image sequences based on the scroll position
- Customizable scroll domain and animation mode
- Preloads images to prevent flickering during animation
- Debounces scroll events to improve performance
- Supports subscribing and unsubscribing image elements
- Includes a python script to generate an image sequence from a video file. 

### Image Frame Format

The image frames in the sequence should be JPEG files with names following this format: `frame_000.jpg`, `frame_001.jpg`, and so on. This naming convention ensures that the ScrollAnimation script can correctly load and animate the images. You can edit the path generating function in the JS file if you want to use .pngs or another image format.

### Extracting Image Sequence from Video

A Python script is provided in the `/source` folder of the project to help you extract a compatible image sequence from a video file. To use this script, ensure that you have the necessary dependencies installed, then run the script with the appropriate input video file. The extracted frames will be saved with the required naming format.


## Installation

Include the `scroll-animation.js` script in your project:

```html
<script src="path/to/scroll-animation.js"></script>
```

## Usage

Create a new ScrollAnimation instance, passing the folder path containing the image sequence and the total number of images as arguments. Optionally, you can provide a configuration object with scrollDomain and animationMode properties.

The image frames are expected to be jpgs with names like the following: frame_000.jpg frame_001.jpg ....

```javascript
const scrollAnim = new ScrollAnimation('image-sequence', 10, {
  scrollDomain: { start: 0, end: 2000 },
  animationMode: 'repeat'
});
```

Subscribe image elements to the ScrollAnimation instance:

```javascript
const imgElement = document.getElementById('your-image-id');
scrollAnim.subscribeImage(imgElement);
```

Unsubscribe image elements if needed:

```javascript
scrollAnim.unsubscribeImage(imgElement);
```

## Configuration options

| Option       | Type   | Description                                                                                           | Default                                                                          |
| ------------ | ------ | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| scrollDomain | Object | An object with `start` and `end` properties defining the scroll range for the animation.             | `{ start: 0, end: document.documentElement.scrollHeight - document.documentElement.clientHeight }` |
| animationMode | String | The animation mode: `'once'`, `'repeat'`, or `'yoyo'`.                                               | `'once'`                                                                         |

## Browser compatibility

ScrollAnimation should work in all modern browsers that support ES6 syntax. For older browsers, you may need to include a polyfill for certain features like String.prototype.padStart.

## License
This project is licensed under the MIT License.
