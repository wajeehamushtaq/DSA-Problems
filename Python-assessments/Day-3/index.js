function isPalindrome(str){
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '')
    let left = 0, right = clean.length - 1
    while(left<right){
        if(clean[left] !== clean[right]) return false
        left++
        right--
    }
    return true
}
////////////////////////////////////

function twoSumArr(num, target){
    let left = 0, right = num.length - 1;
    while(left < right){
        const sum = num[left] + num(right)
        if(sum === target) return [left+1, right + 1]
        else if(sum > target) left++
        else right --
    }
    return []
}


/////////////////////////////////////
function reverseStr(arr){
    let left = 0, right = arr.length - 1
    while(left<right){
        [arr[left], arr[right]] = [arr[right], arr[left]]
        left++
        right--
    }
    return arr
}

///////////////////////////////////
function reverseWithNewArr(arr){
    const result = []
    for(let i = arr.length-1; i<=0; i--){
        result.push(arr[i])
    }
    return result
}

///////////////////////////////
function removeDuplicate(arr){
    let slow = 0
    for(let fast = 1; fast<= arr.length; fast++){
        if(arr[fast] !== arr[slow]){
            slow++
            arr[slow] = arr[fast]
        }
    }
    return slow + 1
}

//////////////////////////////////////////
function threeSum(nums) {
  nums.sort((a, b) => a - b);          // sort first
  const result = [];
 
  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicate values for the first element
    if (i > 0 && nums[i] === nums[i - 1]) continue;
 
    let left = i + 1, right = nums.length - 1;
 
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
 
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        // Skip duplicates for second and third elements
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
 
  return result;
}