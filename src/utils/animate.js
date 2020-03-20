export default function animate(obj, target, callback) {
  clearInterval(obj.timer);//先清除现有的定时器，再向下执行  排他思想
  obj.timer = setInterval(function () {
  // 思路：
  // 1.让盒子每次移动的距离慢慢变小，速度就会慢慢落下来
  // 2. 核心算法：（目标值 - 当前位置） / 10 作为每次的步距
  // 3. 停止条件是： 当前盒子的位置等于目标位置就停止定时器
  var step = (target - obj.pageYOffset) / 10;
  //判断步长值是正值还是负值 正值往大取整 负值往小取整(-8.1 => -9)
  step = step > 0 ? Math.ceil(step) : Math.floor(step);
  if (obj.pageYOffset == target) {
      //停止动画 本质是停止定时器
      clearInterval(obj.timer);
      
      callback && callback(); //"且" 两边同时满足才会执行
  }
  // obj.style.left = obj.offsetLeft + step + 'px';
  obj.scroll(0, obj.pageYOffset + step);
  }, 10);
  }