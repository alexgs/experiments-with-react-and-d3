# Experiments with React and D3

This repository contains various experiments in integrating [React][11] and [D3][10]. I am undertaking the approach of directly integrating the two, rather than relying on a third library.

[10]: https://d3js.org/
[11]: https://facebook.github.io/react/

## My Approach

Specifically, I am following the approach of letting D3 handle DOM manipulations within its realm. Meanwhile, React handles the overall DOM and stays out of D3's realm. For reference, I am following the following articles:

- [Building D3 Components with React][1]
- [Integrating D3 into React][2]

[1]: https://hackernoon.com/building-d3-components-with-react-7510e4743288
[2]: http://eng.wealthfront.com/2017/02/14/integrating-d3-into-react/

## Alternative Approaches

The most common alternate approach, without using a third library, is to use D3 behind the scenes for math and such, while leaving React fully in charge of the DOM.

- [d4 -- Declarative Data-Driven Documents][3]
- [How to integrate React and D3 – The right way][4]
- [Mixing d3 and React][5]

[3]: https://github.com/joelburget/d4
[4]: http://www.adeveloperdiary.com/react-js/integrate-react-and-d3/
[5]: http://www.macwright.org/2016/10/11/d3-and-react.html

## Libraries

Here are some libraries that integrate React and D3 in various ways:

- [react-vis][6]
- [Recharts][7]
- [Resonance][8] is aimed at getting D3 animations into React, from what I can tell
- [Victory][9]

[6]: https://github.com/uber/react-vis
[7]: http://recharts.org/#/en-US/
[8]: https://sghall.github.io/resonance/#/
[9]: https://formidable.com/open-source/victory/

## License

The content of this repository is licensed under the [3-Clause BSD license][12]. Please see the enclosed license file for specific terms.

[12]: https://opensource.org/licenses/BSD-3-Clause
