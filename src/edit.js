import { __ } from '@wordpress/i18n';
import { RichText, __experimentalLinkControl as LinkControl, InspectorControls } from '@wordpress/block-editor';
import { Button, TextControl, Panel, PanelBody, PanelRow } from '@wordpress/components';

export default function Edit(props) {
    const {
        attributes: {blocks = [], headline = ''},
        setAttributes
    } = props;

    const blocksList = (items) => {
        return (
            items.sort((a, b) => a.index - b.index).map(item => {
                return (
                    <div className="blocks__item">
                        <a href={item.link.url ? item.link.url : "#"} target={item.link.opensInNewTab ? '_blank' : '_self'} className="blocks__link" rel={item.link.rel} title={item.link.title}>
                            <RichText.Content
                                tagName="h4"
                                className="blocks__title"
                                value={item.title}
                            />
                            <button className="blocks__button" type="button">
                                {item.label}
                                <svg fill="#1E90FF" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30.729px" height="30.729px" viewBox="0 0 30.729 30.729"><g><path d="M24.813,15.366L10.185,29.997c-0.487,0.487-1.128,0.731-1.768,0.731c-0.641,0-1.279-0.244-1.769-0.731c-0.977-0.978-0.977-2.561,0-3.536l11.095-11.096L6.649,4.268c-0.976-0.977-0.976-2.56,0-3.536c0.977-0.977,2.56-0.976,3.536,0L24.813,15.366z"/></g></svg>
                            </button>
                        </a>
                    </div>
                )
            })
        )
    }

    const blocksInspectorList = (items) => {
        return (
            items.sort((a, b) => a.index - b.index).map(item => {
                return (
                    <PanelRow className="fl-learn-more-panel-row">
                        <TextControl
                            value={ item.title }
                            label={__( "Block Title", "fl-learn-more")}
                            onChange={title => {
                                const newObject = Object.assign({}, item, {
                                    title: title
                                });
                                setAttributes({
                                    blocks: [...blocks.filter(
                                        current => current.index !== item.index
                                    ), newObject]
                                });
                            }}
                        />
                        <TextControl
                            value={ item.label }
                            placeholder={__( "Read More", "fl-learn-more")}
                            label={__( "Link Label", "fl-learn-more" )}
                            onChange={label => {
                                const newObject = Object.assign({}, item, {
                                    label: label
                                });
                                setAttributes({
                                    blocks: [...blocks.filter(
                                        current => current.index !== item.index
                                    ), newObject]
                                });
                            }}
                        />

                        <span className="fl-learn-more-panel-row__label">{__( "Link URL", "fl-learn-more" )}</span>
                        <LinkControl
                            value={item.link}
                            forceIsEditingLink={true}
                            showSuggestions={true}
                            onChange={link => {
                                const newObject = Object.assign({}, item, {
                                    link: link
                                });
                                setAttributes({
                                    blocks: [...blocks.filter(
                                        current => current.index !== item.index
                                    ), newObject]
                                });
                            }}
                        />
                        <Button
                            className="button-secondary"
                            onClick={() => {
                                const newBlocks = blocks.filter(current => current.index !== item.index).map(i => {
                                    if (i.index > item.index) {
                                        i.index -= 1;
                                    }
                                    return i;
                                });
                                setAttributes({blocks: newBlocks});
                            }}
                        >{__( "Remove Block", "fl-learn-more" )}</Button>

                        <hr/>
                    </PanelRow>
                )
            })
        )
    }

    const blocksInspectorAdd = (items) => {
        if (items && items.length < 3) {
            return (
                <PanelRow className="fl-learn-more-panel-row">
                    <Button className="button-primary" onClick={() => {
                        setAttributes({
                            blocks: [...blocks, {
                                index: blocks.length,
                                title: "",
                                label: "",
                                link: {
                                    url: "",
                                    opensInNewTab: false,
                                    rel: "noopener",
                                    title: ""
                                }
                            }]
                        });
                    }}>{__( "Add Block", "fl-learn-more" )}</Button>
                </PanelRow>
            )
        }
    }

    return (
        <>
            <InspectorControls>
                <Panel>
                    <PanelBody title={__( "General Settings", "fl-learn-more" )} initialOpen={true}>
                        <PanelRow>
                            <TextControl
                                className="title"
                                label={__( "Section Title", "fl-learn-more")}
                                value={headline}
                                onChange={ ( headline ) => setAttributes( { headline } ) }
                            />
                        </PanelRow>
                    </PanelBody>
                    <PanelBody title={__( "Blocks Settings", "fl-learn-more" )} initialOpen={true}>
                        {blocksInspectorList(blocks)}
                        {blocksInspectorAdd(blocks)}
                    </PanelBody>
                </Panel>
            </InspectorControls>

            <div className="wp-block-fl-learn-more-blocks">
                <h3 className="title">{headline}</h3>

                <div className="blocks">{blocksList(blocks)}</div>
            </div>
        </>
    );
}