export const problems = [
  {
    id: 1,
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`,
    difficulty: "Easy",
    acceptance: 55.8,
    solved: true,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10⁴",
      "-10⁹ <= nums[i] <= 10⁹",
      "-10⁹ <= target <= 10⁹",
      "Only one valid answer exists."
    ],
    defaultCode: {
      python: `def twoSum(nums, target):
    # Write your code here
    pass`,
      java: `public int[] twoSum(int[] nums, int target) {
    // Write your code here
    return new int[0];
}`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    // Write your code here
    return {};
}`
    }
  },
  {
  id: 2,
  title: "Next Permutation",
  description: `A permutation of an array of integers is an arrangement of its members into a sequence or linear order.
**For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1].
The next permutation of an array of integers is the next lexicographically greater permutation of its integer.More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container.If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).
For example, the next permutation of arr = [1,2,3] is [1,3,2].
Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.
Given an array of integers nums, find the next permutation of nums.
The replacement must be in place and use only constant extra memory.`
,
  difficulty: "Medium",
  acceptance: 37.5, // You can change this if you want to match other sources
  solved: false,
  examples: [
    {
      input: "nums = [1,2,3]",
      output: "[1,3,2]"
    },
    {
      input: "nums = [3,2,1]",
      output: "[1,2,3]"
    },
    {
      input: "nums = [1,1,5]",
      output: "[1,5,1]"
    }
  ],
  constraints: [
    "1 <= nums.length <= 100",
    "0 <= nums[i] <= 100"
  ],
  defaultCode: {
    python: `def nextPermutation(nums):
    # Write your code here
    pass`,
    java: `public void nextPermutation(int[] nums) {
    // Write your code here
}`,
    cpp: `void nextPermutation(vector<int>& nums) {
    // Write your code here
}`
  }
}
];
