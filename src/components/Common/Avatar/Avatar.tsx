import styles from './Avatar.module.scss';

export type AvatarType = {
    img: string | null;
    alt: string;
    size?: string;
    isShowName?: boolean;
    name?: string;
}

export default function Avatar({ img, alt, size = '50px', isShowName = false, name }: AvatarType) {
    const styleVariable: { [key: string]: string } = { '--size': size };
    return (
        <div className={styles['avatar-group']}>
            <div className={styles['avatar']} style={styleVariable}>
                <img src={img || '../../../assets/images/blankUser.png'} alt={alt} />
            </div>
            {isShowName && <h4>{name}</h4>}
        </div>

    );
}