import { RichText } from '@wordpress/block-editor';

export default function Save( props ) {
    const {
        attributes: {blocks = [], headline = ''}
    } = props;

    return (
        <div className="wp-block-fl-learn-more-blocks">
            <h3 className="title">{headline}</h3>
            <div className="blocks">
                {blocks.length > 0 &&
                    blocks.map(block => {
                        return (
                            <div className="blocks__item">
                                <a href={block.link.url ? block.link.url : "#"} target={block.link.opensInNewTab ? '_blank' : '_self'} className="blocks__link" rel={block.link.rel} title={block.link.title}>
                                    <RichText.Content
                                        tagName="h4"
                                        className="blocks__title"
                                        value={block.title}
                                    />
                                    <button className="blocks__button" type="button">
                                        {block.label}
                                        <svg fill="#1E90FF" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30.729px" height="30.729px" viewBox="0 0 30.729 30.729"><g><path d="M24.813,15.366L10.185,29.997c-0.487,0.487-1.128,0.731-1.768,0.731c-0.641,0-1.279-0.244-1.769-0.731c-0.977-0.978-0.977-2.561,0-3.536l11.095-11.096L6.649,4.268c-0.976-0.977-0.976-2.56,0-3.536c0.977-0.977,2.56-0.976,3.536,0L24.813,15.366z"/></g></svg>
                                    </button>
                                </a>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}