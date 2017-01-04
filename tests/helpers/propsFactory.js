import AppContainerProps from './propsFactories/AppContainer.propsFactory';
import ErrorMessagesProps from './propsFactories/ErrorMessages.propsFactory';
import ErrorMessageProps from './propsFactories/ErrorMessage.propsFactory';
import InfoParagraphProps from './propsFactories/InfoParagraph.propsFactory';
import LoginFormContainerProps from './propsFactories/LoginFormContainer.propsFactory';
import LoginFormProps from './propsFactories/LoginForm.propsFactory';
import NavbarContainerProps from './propsFactories/NavbarContainer.propsFactory';
import NavbarProps from './propsFactories/Navbar.propsFactory';
import SignupFormProps from './propsFactories/SignupForm.propsFactory';
import SignupFormContainerProps from './propsFactories/SignupFormContainer.propsFactory';

const propsList = {
  AppContainerProps,
  ErrorMessageProps,
  ErrorMessagesProps,
  InfoParagraphProps,
  LoginFormContainerProps,
  LoginFormProps,
  NavbarContainerProps,
  NavbarProps,
  SignupFormContainerProps,
  SignupFormProps,
};

export default (propsName, emptyOrFilled, newProps) => {
  if (!newProps) { newProps = {}; }
  if (!propsList[propsName]) { throw new Error('no such props exist'); }
  if (!['empty', 'filled'].includes(emptyOrFilled)) { emptyOrFilled = 'empty'; }
  return Object.assign({}, propsList[propsName][emptyOrFilled], newProps);
};
