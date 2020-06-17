import styles from './CloseBtnSvg.module.scss'

const CloseBtnSvg = ({ handleClick }) => {

    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="rgba(0, 0, 0)"
            className={styles.closeBtn}
            onClick={handleClick}
        >
            <title>close</title>
            <path d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z"></path>
        </svg>
    );
};

export default CloseBtnSvg;
