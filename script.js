new Vue({
  el: '#app',
  data: {
    userInput: '',
    output: '',
    showIEEE: false,
    showDecimalValue: false,
    showBinaryValue: false,
    binaryToDecimalConversionArr: [],
    decimalToBinaryConversionArr: []
  },
  computed: {},
  methods: {
    convertBinaryToDecimal: function() {
      // reset the binaryToDecimalConversion array to be empty to get rid of previous values
      this.binaryToDecimalConversionArr = []
      // We will add values to this number
      let finalValue = 0
      // This will be the temporary value of the powers and will be used in our string array
      let currentValue = 0
      // Will hold all the binary values in an array so we can iterate over it
      let binaryInArray = [...this.userInput].reverse()
      // iterate over the array and if the index == 1 then do the power of 2 to i
      for (let i = 0; i < binaryInArray.length; i++) {
        if (binaryInArray[i] == '1') {
          finalValue += Math.pow(2, i)
          currentValue = Math.pow(2, i)
          this.binaryToDecimalConversionArr.push(
            `2 to the power of ${i} = ${currentValue}`
          )
        }
      }
      // set the user input data field to be equal to the result of this function
      this.output = finalValue
      // set the input field to the value of the conversion
      this.userInput = this.output

      // set other show boolean values to false
      this.showBinaryValue = false
      this.showIEEE = false

      // set show decimal boolean to true
      this.showDecimalValue = true
    },
    convertDecimalToBinary: function() {
      // reset the decimalToBinaryConversion array to be empty to get rid of previous values
      this.decimalToBinaryConversionArr = []
      // Convert input to an int and lets check for some edge cases
      let int = parseInt(this.userInput, 10)
      // Create an array to hold all the binary values
      const binaryValues = []
      while (int != 0) {
        // We know the modulus of int will either be 1 or 0
        // We will take that value and unshift it to binaryValues
        binaryValues.unshift(int % 2)
        // Lets add some operations to our array
        this.decimalToBinaryConversionArr.push(
          `2 goes into ${int} ${Math.floor(
            int / 2
          )} times with a remainder of ${int % 2}`
        )
        // Lets divide int by 2 to get the next value we will perform modulus 2 on
        // in case the result of int / 2 is not even we will need to perform math.floor so we get a whole number
        int = Math.floor(int / 2)
      }
      // lastly return our array and join it to a string
      this.output = binaryValues.join('')
      // set the user input equal to the output
      this.userInput = this.output

      // set other boolean values to false
      this.showIEEE = false
      this.showDecimalValue = false
      // Change show binary value to true
      this.showBinaryValue = true
    },
    iTrippleEFormat: function() {
      if (!this.userInput.includes('.')) {
        this.output =
          'You have not entered a floating point value please try again.'
      }

      this.output = floatingPoint(this.userInput)
      this.userInput = this.output

      // set other boolean values to false
      this.showBinaryValue = false
      this.showDecimalValue = false
      // so we can show a block html set showIEEE to true
      this.showIEEE = true
    }
  }
})

const floatingPointValue = {
    signBit: '0',
    exponent: '00000000',
    mantissa: '0'
  }
  
  let numberOfPlacesWeNeedToSolveFor = 0
  
  // looks at the first character of user input to see if it is negative 
  const isNegative = (input) => {
    return input[0] == '-'
  }
  
  // check user input to see if decimal point exists
  const hasDecimal = (input) => {
    return input.includes('.')
  }
  
  // assuming a decimal point exists split at the decimal point
  const splitAtDecimalPoint = (input) => {
    return input.split('.')
  }
  
  // For values greater than one this will convert from decimal to binary
  const convertValsGreaterThanOneToBinary = (input) => {
    // convert input to an int
    let int = parseInt(input, 10)
    // create an array to hold the binary values of our division
    const binaryValues = []
    while (int != 0) {
      binaryValues.unshift(int % 2)
      int = Math.floor(int / 2)
    }
    return binaryValues.join('')
  }
  
  // Get the values after the decimal point
  const getValsAfterDecimal = (int) => {
    return (int - Math.floor(int))
    // .toFixed(2)
  }
  
  // Get the values before a decimal point
  const getValsBeforeDecimal = (int) => {
    return Math.floor(int)
  }
  
  // converts all values less than one to binary up to 23 spaces
  const convertValsLessThanOneToBinary = (input) => {
    //  let int = parseInt(input, 10)
     let int = input * 2
     let valsOfDecimal = []
     let i = 0
     // this is the place where we have to dynamically figure out how many places we have to go
     while(i < numberOfPlacesWeNeedToSolveFor) {
       console.log(int)
       if(int < 1) {
         valsOfDecimal.push(0)
       } else {
         valsOfDecimal.push(1)
       }
      int = getValsAfterDecimal(int) * 2
      // console.log(int)
      i++
     }
     return valsOfDecimal.join('')
  }
  
  // will return the value of exponent
  const findExponent = (input) => {
    return input.length - 1
  }
  
  const floatingPoint = (input) => {
    let signBit = ''  
    // based on whether input is negative or positive make the sign bit 1 or 0
    if(isNegative(input)) {
      signBit = '1'
      // Oooo this is a bad use of global scoped variable should revise
      var input = input.slice(1, input.length)
    } else {
      signBit = '0'
    }
  
      // split our input at the decimal point into two inputs
      const inputs = splitAtDecimalPoint(input)
      // assign 0th index to the value of greater than one
      const greaterThanOne = inputs[0]
      // assign 1st index to the value of less than one
     const lessThanOne = '.' + inputs[1]
     
     // convert vals greater than 1 to binary (ie before decimal point)
     const binaryValsGreaterThanOne = convertValsGreaterThanOneToBinary(greaterThanOne)
  
     // from here let figure out our exponent
     const exponent = findExponent(binaryValsGreaterThanOne)
  
    // we caluclate our normalized exponent that will take up 8 bits
     const normalizedExponent = convertValsGreaterThanOneToBinary(exponent + 127)
  
     // lets caluclate the first part of our mantissa
     const firstPartOfMantissa = binaryValsGreaterThanOne.slice(1, binaryValsGreaterThanOne.length)
  
     // we need to subtract this value from 23 to calculate how many times the convertValsLessThanOneToBinary function should run so we have 32 bits total
     numberOfPlacesWeNeedToSolveFor = 23 - exponent
     
     // lets convertValsLessThanOneToBinary
     const binaryValsLessThanOne = convertValsLessThanOneToBinary(lessThanOne)
  
     // For the hell of it let's show the conversion so far
     const conversionSoFar = binaryValsGreaterThanOne + '.' + binaryValsLessThanOne
     console.log("conversion so far", conversionSoFar)
  
     // This is the final mantissa
     const mantissa = firstPartOfMantissa + binaryValsLessThanOne
  
     return signBit + normalizedExponent + mantissa
  }