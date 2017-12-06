import React, { Component } from 'react';
import styles from './Post.scss';
import classNames from 'classnames/bind';

import * as ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/clouds_midnight';
import 'brace/theme/monokai';

import { PostWrapper, Input, InputError, Button, FlexBox } from 'components';

const cx = classNames.bind(styles);

class Post extends Component {

    post = null

    componentDidMount() {
        this.initializeEditor();
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.value === this.props.value) return;

        if(nextProps.value === '') {
            const { value } = nextProps;
            this.writeeditor.setValue(value);
        }
    }

    initializeEditor = () => {
        const { readonly, content } = this.props;

        const post = ace.edit('post-editor');
        const session = post.getSession();

        window.post = post;
        window.session = session;

        session.setMode('ace/mode/javascript');
        session.setUseWrapMode(true);
        post.setTheme('ace/theme/clouds_midnight');
        post.$blockScrolling = Infinity;
        post.setShowPrintMargin(false);
        post.renderer.setShowGutter(true);

        if(content) {
            post.setValue(content);
        }
        
        if(readonly) {
            post.container.style.pointerEvents="none"
            post.container.style.opacity=0.5 // or use svg filter to make it gray
            post.renderer.setStyle("disabled", true)
            post.blur()
        }

        this.post = post;
    }

    handleChange = (value) => {
        const { onChangeContent, readonly } = this.props;
        
        if(!readonly) {
            onChangeContent(this.post.getValue());
        }
    }

    render() {
        const { handleChange } = this;
        const { onChangeTitle, onInsertPost, onEditPost, onDeletePost, title, error, readonly, saved } = this.props;

        return (
            <PostWrapper>
                <div className={cx('post-header')}>
                    {!readonly && <Input
                        className={cx('title-input')}
                        onChange={onChangeTitle}
                        value={title ? title : ''}
                        name="title"
                        fullWidth big
                        placeholder="제목"/>}
                    {readonly &&<div className={cx('title-readonly')}>
                        {title}
                    </div>}
                    { readonly
                    ?   <FlexBox row>
                            <Button 
                            className={cx('button')}
                            flat color="grey"
                            onClick={()=>onEditPost()}>
                                수정
                            </Button>
                            <Button 
                            className={cx('button')}
                            flat color="grey"
                            onClick={()=>onDeletePost()}>
                                삭제
                            </Button>
                        </FlexBox>
                    :   <FlexBox row>
                            <Button 
                            className={cx('button')}
                            flat color="grey"
                            onClick={()=>onInsertPost(true)}>
                                임시저장
                            </Button>
                            <Button 
                            className={cx('button')}
                            flat color="grey"
                            onClick={()=>onInsertPost(false)}>
                                저장
                            </Button>
                        </FlexBox>
                    }
                </div>
                <InputError error={error}/>
                <div className={cx('post-editor')} id="post-editor" onKeyUp={handleChange}>
                </div>
                <div className={cx('post-footer')}>
                    { readonly
                    ?   <FlexBox row><Button 
						className={cx('button')}
						flat color="grey"
						onClick={()=>onEditPost(true)}>
							수정
						</Button>
						<Button
						className={cx('button')}
						flat color="grey"
						onClick={()=>onDeletePost(false)}>
							삭제
						</Button></FlexBox>
					:	<FlexBox row><Button 
						className={cx('button')}
						flat color="grey"
						onClick={()=>onInsertPost(true)}>
							임시저장
						</Button>
						<Button
						className={cx('button')}
						flat color="grey"
						onClick={()=>onInsertPost(false)}>
							저장
						</Button></FlexBox>
					}
                </div>
            </PostWrapper>
        );
    }
}

export default Post;