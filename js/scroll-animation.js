class ScrollAnimation {
    constructor(folderPath, totalImages, config = {}) {
      this.folderPath = folderPath;
      this.totalImages = totalImages;
      this.imageChangeThreshold = 1 / totalImages;
      this.imageSequence = this.generateImageSequence();
      this.subscribedImages = new Set();
      this.scrollDomain = config.scrollDomain || { start: 0, end: document.documentElement.scrollHeight - document.documentElement.clientHeight };
      this.animationMode = config.animationMode || 'once';
  
      this.preloadImages(this.imageSequence, () => {
        const debouncedUpdateImage = this.debounce(this.updateImage.bind(this), 1);
        window.addEventListener("scroll", debouncedUpdateImage);
      });
    }
  
    debounce(func, wait) {
      let timeout;
      return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
      };
    }
  
    generateImageSequence() {
      const images = [];
      for (let i = 0; i < this.totalImages; i++) {
        images.push(`${this.folderPath}/frame_${String(i).padStart(3, "0")}.jpg`);
      }
      return images;
    }
  
    preloadImages(imageSequence, callback) {
      let loadedCount = 0;
      imageSequence.forEach((src) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === imageSequence.length) {
            callback();
          }
        };
        img.src = src;
      });
    }
  
    updateImage() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
        // Adjust the scrollPercent based on the scrollDomain
        const domainHeight = this.scrollDomain.end - this.scrollDomain.start;
        let scrollPercent = (scrollTop - this.scrollDomain.start) / domainHeight;
    
        if (this.animationMode === 'yoyo') {
            const completeCycles = Math.floor(scrollPercent )
            scrollPercent = (completeCycles % 2 === 0) ? 
            scrollPercent - completeCycles : 
            1 - scrollPercent + completeCycles;
        
        } else if (this.animationMode === 'repeat') {
          scrollPercent = scrollPercent % 1;
        } else { // 'once' mode
          scrollPercent = Math.max(0, Math.min(scrollPercent, 1));
        }
    
        const imageIndex = Math.min(Math.floor(scrollPercent / this.imageChangeThreshold), this.totalImages - 1);
    
        this.subscribedImages.forEach((image) => {
          image.src = this.imageSequence[imageIndex];
        });
      }
  
    subscribeImage(image) {
      this.subscribedImages.add(image);
    }
  
    unsubscribeImage(image) {
      this.subscribedImages.delete(image);
    }
  }
  