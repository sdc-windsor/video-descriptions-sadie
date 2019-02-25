import React from 'react';
import { IconTabSmall } from '../styles.js';

class IconTab extends React.Component {
    constructor(props) {
        super(props);

    }

    shortenNum(num) {
        const stringifiedNum = num;
        if (stringifiedNum.length >= 7 && stringifiedNum.length < 10) {
            const milDigit = stringifiedNum.slice(0, stringifiedNum.length - 4);
            return this.convertMilToString(stringifiedNum, milDigit);
        } else if (stringifiedNum.length >= 10 && stringifiedNum.length < 13) {
            const bilDigit = stringifiedNum.slice(0, stringifiedNum.length - 7)
            return this.convertBilToString(stringifiedNum, bilDigit);
        } else if (stringifiedNum.length >= 4 && stringifiedNum.length < 7) {
            const kDigit = stringifiedNum.slice(0, stringifiedNum.length - 1)
            return this.convertThousandToString(stringifiedNum, kDigit);
        } else {
            return num
        }

    }

    convertMilToString(stringifiedNum, milDigit) {
        if (Number(milDigit[milDigit.length - 1]) >= 5) {
            console.log('last digit >5')
            let newNum = Number(milDigit.slice(0, milDigit.length - 1)) + 1;
            let newArr = newNum.toString().split('');
            newArr.splice(newArr.length - 1, 0, ".")
            return newArr.join('') + ' M';
        } else {
            let newNum = Number(milDigit.slice(0, milDigit.length - 1));
            let newArr = newNum.toString().split('');
            newArr.splice(newArr.length - 1, 0, ".")
            return newArr.join('') + ' M';
        }
    }

    convertBilToString(stringifiedNum, bilDigit) {
        if (Number(bilDigit[bilDigit.length - 1]) >= 5) {
            console.log('last digit >5')
            let newNum = Number(bilDigit.slice(0, bilDigit.length - 1)) + 1;
            let newArr = newNum.toString().split('');
            newArr.splice(newArr.length - 1, 0, ".")
            return newArr.join('') + ' B';
        } else {
            let newNum = Number(bilDigit.slice(0, bilDigit.length - 1));
            let newArr = newNum.toString().split('');
            newArr.splice(newArr.length - 1, 0, ".")
            return newArr.join('') + ' B';
        }

    }

    convertThousandToString(stringifiedNum, kDigit) {
        if (stringifiedNum.length === 4) {
            console.log("length ==4")
            let newNum = Number(kDigit.slice(0, kDigit.length - 1));
            let newArr = newNum.toString().split('');
            newArr.splice(newArr.length - 1, 0, ".")
            return newArr.join('') + ' K';
        } else {
            if (Number(kDigit[kDigit.length - 1]) >= 5) {
                console.log('last digit >5')
                let newNum = Number(kDigit.slice(0, kDigit.length - 1)) + 1;
                let newArr = newNum.toString().split('');
                newArr.splice(newArr.length - 1, 0, ".")
                return newArr.join('') + ' K';
            } else {
                let newNum = Number(kDigit.slice(0, kDigit.length - 1));
                let newArr = newNum.toString().split('');
                newArr.splice(newArr.length - 1, 0, ".")
                return newArr.join('') + ' K';
            }
        }

    }

    render() {
        return (
            <div>
                <div style={IconTabSmall}>
                    <i className="material-icons">play_arrow_outline</i>
                    <div style={{
                        flex: '1',
                        // position: 'absolute',
                        // top: '50%'
                    }}
                    >{this.shortenNum(this.props.data.plays)}</div>
                </div>
            </div>
        )
    }

}

export default IconTab;