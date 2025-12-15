
import styles from './index.module.less'
export default function KbpPanel({ children }) {
    const Search = children.find(child => child.type === KbpPanel.Search);
    const Table = children.find(child => child.type === KbpPanel.Table);
    return (
        <section className={styles.panel}>
            <section className={styles['panel-search']}>
                {Search?.props?.children}
            </section>
            <section className={styles['panel-contet']}>
                {Table?.props?.children}
            </section>
        </section>
    );
}
// 定义插槽标识组件
KbpPanel.Search = ({ children }) => children;
KbpPanel.Table = ({ children }) => children;