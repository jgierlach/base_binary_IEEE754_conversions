new Vue({
  el: '#app',
  data: {
    userInput: '',
    output: '',
    showIEEE: false,
    showDecimalValue: false,
    showBinaryValue: false,
    binaryToDecimalConversionArr: [],
    decimalToBinaryConversionArr: [],
    iEEEOperationsArr: [],
    signBit: '',
    exponent: '',
    mantissa: ''
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
          `2 goes into ${int}, ${Math.floor(
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
      // Let reset our iEEEOperationsArray to get rid of old entries
      this.iEEEOperationsArr = []

      if (!this.userInput.includes('.')) {
        this.output =
          'You have not entered a floating point value please try again.'
      }

      let numberOfPlacesWeNeedToSolveFor = 0

      // looks at the first character of user input to see if it is negative
      const isNegative = input => {
        return input[0] == '-'
      }

      // assuming a decimal point exists split at the decimal point
      const splitAtDecimalPoint = input => {
        return input.split('.')
      }

      // For values greater than one this will convert from decimal to binary
      const convertValsGreaterThanOneToBinary = input => {
        // convert input to an int
        let int = parseInt(input, 10)
        // create an array to hold the binary values of our division
        const binaryValues = []
        while (int != 0) {
          // We know the modulus of int will either be 1 or 0
          // We will take that value and unshift it to binaryValues
          binaryValues.unshift(int % 2)

          // push values to this iEEE array keeping track of these operations
          this.iEEEOperationsArr.push(
            `2 goes into ${int}, ${Math.floor(
              int / 2
            )} times with a remainder of ${int % 2}`
          )

          // Lets divide int by 2 to get the next value we will perform modulus 2 on
          // in case the result of int / 2 is not even we will need to perform math.floor so we get a whole number
          int = Math.floor(int / 2)
        }
        // append the output of this function to our iEEE operations array
        this.iEEEOperationsArr.push(
          `Conversion of values greater than one = ${binaryValues.join('')}`
        )
        this.iEEEOperationsArr.push(
          `----------------------------------------------------------`
        )

        return binaryValues.join('')
      }

      // Get the values after the decimal point
      const getValsAfterDecimal = int => {
        return int - Math.floor(int)
      }

      // converts all values less than one to binary up to 23 spaces
      const convertValsLessThanOneToBinary = input => {
        let int = input * 2
        // depending on the value of greater or less than one we will have a different response
        let greaterOrLessThanOne = ''
        // update the array before we start the arry otherwise every value will be off by 1
        this.iEEEOperationsArr.push(`${input} times 2 = ${int} ${greaterOrLessThanOne}`)
        let valsOfDecimal = []
        let i = 0
        // this is the place where we have to dynamically figure out how many places we have to go
        while (i < numberOfPlacesWeNeedToSolveFor) {
          console.log(int)
          if (int < 1) {
            valsOfDecimal.push(0)
          } else {
            valsOfDecimal.push(1)
          }
          
          // here we will set the value of the greater or less than one should convert this to a ternary
          if(getValsAfterDecimal(int) * 2 >= 1) {
            greaterOrLessThanOne = 'which is greater than 1 so we set aside a 1'
          } else {
            greaterOrLessThanOne = 'which is less than 1 so we set aside a 0'
          }
          // update the iEEE operations array
          this.iEEEOperationsArr.push(`${getValsAfterDecimal(int)} times 2 = ${getValsAfterDecimal(int) * 2} ${greaterOrLessThanOne}`)

          int = getValsAfterDecimal(int) * 2

          // finally increment our counter variable
          i++
        }
        // append the result of this function to the iEEE operations array
        this.iEEEOperationsArr.push(
          `Conversion of values less than one = ${valsOfDecimal.join('')}`
        )
        return valsOfDecimal.join('')
      }

      // will return the value of exponent
      const findExponent = input => {
        return input.length - 1
      }

      // This function will combine all fo our previously written methods
      const floatingPoint = input => {
        let signBit = ''
        // based on whether input is negative or positive make the sign bit 1 or 0
        if (isNegative(input)) {
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

        // This is where our iEEE operations array will start give initial instructions on how our operations should start
        this.iEEEOperationsArr
          .push(`We begin by splitting up our floating point number
                                      into two values. Everything before the decimal point and everything after the decimal point.`)
        this.iEEEOperationsArr.push(
          `So we have ${greaterThanOne} and ${lessThanOne}`
        )
        this.iEEEOperationsArr.push(
          `We'll convert everything greater than one into binary and then convert everything less than one to binary`
        )
        this.iEEEOperationsArr.push(`Lets begin with ${greaterThanOne}`)

        // convert vals greater than 1 to binary (ie before decimal point)
        const binaryValsGreaterThanOne = convertValsGreaterThanOneToBinary(
          greaterThanOne
        )

        // Now it's time to convert everything less than 1
        this.iEEEOperationsArr.push(`Now it's time to convert ${lessThanOne}`)

        // from here lets figure out our exponent
        const exponent = findExponent(binaryValsGreaterThanOne)

        // we caluclate our normalized exponent that will take up 8 bits
        const normalizedExponent = convertExponentToBinary(exponent + 127)

        // Our normalized exponent needs to take up 8 bits if it's only 7 0 should be appended
        if(normalizedExponent.length == 7) {
          normalizedExponent = '0' + normalizedExponent
        }

        // lets caluclate the first part of our mantissa
        const firstPartOfMantissa = binaryValsGreaterThanOne.slice(
          1,
          binaryValsGreaterThanOne.length
        )

        // we need to subtract this value from 23 to calculate how many times the convertValsLessThanOneToBinary function should run so we have 32 bits total
        numberOfPlacesWeNeedToSolveFor = 23 - exponent

        // lets convertValsLessThanOneToBinary
        const binaryValsLessThanOne = convertValsLessThanOneToBinary(
          lessThanOne
        )

        // For the hell of it let's show the conversion so far
        const conversionSoFar =
          binaryValsGreaterThanOne + '.' + binaryValsLessThanOne
        console.log('conversion so far', conversionSoFar)

        this.iEEEOperationsArr.push(
          `---------------------------------------------------`
        )
        // update our iEEE opperations array with the conversion so far
        this.iEEEOperationsArr.push(
          `Put the result of these conversion together and this is what we have so far ${conversionSoFar}`
        )
        this.iEEEOperationsArr.push(
          `----------------------------------------------------`
        )
        this.iEEEOperationsArr.push(
          `Now we have to calculate our sign bit, exponent, and mantissa`
        )

        // instructions on how to handle the sign bit
        this.iEEEOperationsArr.push(
          `The sign bit is easy. If the number we entered is negative the sign bit is 1. If it was positive the sign bit is 0. In this case the sign bit is ${signBit}.`
        )

       // instructions on how to handle the expoenent
       this.iEEEOperationsArr.push(`Our exponent is equal to the distance we have to move the decimal for our value to equal 1.something. In this case our exponent is equal to ${exponent}. But we're not done yet! We have to still normalize our exponent. We do this by adding ${exponent} to 127. We will now convert this value to binary and it will take up 8 bits of the allotted 32. Our normalized exponent is equal to ${normalizedExponent}.`)   

        // This is the final mantissa
        const mantissa = firstPartOfMantissa + binaryValsLessThanOne

        // instruction on how to handle the mantissa
        this.iEEEOperationsArr.push(`Ok we're almost done! We have to calculate the mantissa. `)
        
        // We're done
        this.iEEEOperationsArr.push(`Ok great work! All that's left is to put together all the pieces we calculated and we'll have our final value. To conclude computers really suck at representing and handling floating point values.`)

        this.signBit = signBit
        this.exponent = normalizedExponent
        this.mantissa = mantissa

        // return signBit + normalizedExponent + mantissa
        this.output = signBit + normalizedExponent + mantissa
      }

      // this.output = floatingPoint(this.userInput)
      floatingPoint(this.userInput)

      // set other boolean values to false
      this.showBinaryValue = false
      this.showDecimalValue = false
      // so we can show a block html set showIEEE to true
      this.showIEEE = true
    }
  }
})

// Aghhh code duplication this is so bad
const convertExponentToBinary = input => {
  // convert input to an int
  let int = parseInt(input, 10)
  // create an array to hold the binary values of our division
  const binaryValues = []
  while (int != 0) {
    // We know the modulus of int will either be 1 or 0
    // We will take that value and unshift it to binaryValues
    binaryValues.unshift(int % 2)

    // Lets divide int by 2 to get the next value we will perform modulus 2 on
    // in case the result of int / 2 is not even we will need to perform math.floor so we get a whole number
    int = Math.floor(int / 2)
  }
  // append the output of this function to our iEEE operations array
  return binaryValues.join('')
}
