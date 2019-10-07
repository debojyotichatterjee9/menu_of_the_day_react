import React from "react";


/* Note: The Header component below just has one render function and does not have any dynaminc data in it
the data is fed to it, it just resnders some HTML in the DOM. Hence, there is no need for it to be a full 
blown React Component. So, here we can use a stateless functional component. If a component only has a render
method and prop types then you can convert the React Component into a stateless functional component, it is
unecessary to write a React Component for it. This practice can avoid verbose and enhance performance as well. */

const Header = ({ tagline }) => ( // here ES6 destructuring is used, "tagline" is accessing "props.tagline" directly
    <>
        <header className="top">
            <h1>
                Menu
        <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                </span>
                Day
            </h1>
                <h3 className="tagline">
                    <span>{tagline}</span>
            </h3>
        </header>
    </>
);


/*We may use this if required otherwise for only rendering HTML in the DOM, above stateless functional component is a better way. */
// class Header extends React.Component {
//     render () {
//         return (
//             <>
//             <header className="top">
//                 <h1>Menu
//                     <span className="ofThe">
//                         <span className="of">
//                         of
//                         </span>
//                         <span className="the">
//                         the
//                         </span>
//                     </span>
//                     Day</h1>
//             <h3 className="tagline">
//                 <span>{this.props.tagline}</span>
//             </h3>
//             </header>
//             </>
//         );
//     }
// }

export default Header;