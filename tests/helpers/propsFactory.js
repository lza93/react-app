import AppProps from './propsFactories/App.propsFactory';
import ErrorMessagesProps from './propsFactories/ErrorMessages.propsFactory';
import ErrorMessageProps from './propsFactories/ErrorMessage.propsFactory';
import InfoParagraphProps from './propsFactories/InfoParagraph.propsFactory';
import LoginFormProps from './propsFactories/LoginForm.propsFactory';
import NavbarProps from './propsFactories/Navbar.propsFactory';

const propsList = {
  AppProps,
  ErrorMessageProps,
  ErrorMessagesProps,
  InfoParagraphProps,
  LoginFormProps,
  NavbarProps,
};

export default (propsName, emptyOrFilled, newProps) => {
  if (!newProps) { newProps = {}; }
  if (!propsList[propsName]) { throw new Error('no such props exist'); }
  if (!['empty', 'filled'].includes(emptyOrFilled)) { emptyOrFilled = 'empty'; }
  return Object.assign({}, propsList[propsName][emptyOrFilled], newProps);
};
