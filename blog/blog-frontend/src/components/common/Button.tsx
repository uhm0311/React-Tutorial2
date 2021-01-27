import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  cyan?: boolean;
  to?: string;
}

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: ${palette.gray[8]};

  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props: Props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props: Props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};

      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

  &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button: React.FC<Props> = (props) => {
  return props.to ? (
    <StyledLink
      fullWidth={props.fullWidth}
      to={props.to}
      cyan={props.cyan}
      children={props.children}
    />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
