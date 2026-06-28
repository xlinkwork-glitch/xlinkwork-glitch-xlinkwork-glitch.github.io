(function () {
  // 用 data-src 标记的图片：进入视口时才替换 src
  function activate(img) {
    var src = img.dataset.src;
    if (!src) return;
    img.src = src;
    img.removeAttribute('data-src');
    img.classList.add('lazy--loaded');
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          activate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px 0px' }); // 提前 200px 开始加载，避免闪烁

    document.querySelectorAll('img[data-src]').forEach(function (img) {
      io.observe(img);
    });
  } else {
    // 降级：直接全部加载
    document.querySelectorAll('img[data-src]').forEach(activate);
  }

  // 文章正文内的图片（Markdown 渲染，没有 data-src）也加淡入
  if ('IntersectionObserver' in window) {
    var contentIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('lazy--loaded');
          contentIO.unobserve(entry.target);
        }
      });
    }, { rootMargin: '100px 0px' });

    document.querySelectorAll('.post__content img:not([data-src])').forEach(function (img) {
      img.classList.add('lazy--content');
      if (img.complete) {
        img.classList.add('lazy--loaded');
      } else {
        contentIO.observe(img);
        img.addEventListener('load', function () {
          img.classList.add('lazy--loaded');
        });
      }
    });
  }
})();
