// Project: Skill-Sharing Website

// Rendering components

function renderUserField(name, dispatch) {
  return elt(
    'label',
    {},
    'Your name: ',
    elt('input', {
      type: 'text',
      value: name,
      onchange(event) {
        dispatch({ type: 'setUser', user: event.target.value });
      }
    })
  );
}

// A similar function is used to render talks, which include a list of comments and a form for adding a new comment.

function renderTalk(talk, dispatch) {
  return elt(
    'section',
    { className: 'talk' },
    elt(
      'h2',
      null,
      talk.title,
      ' ',
      elt(
        'button',
        {
          type: 'button',
          onclick() {
            dispatch({ type: 'deleteTalk', talk: talk.title });
          }
        },
        'Delete'
      )
    ),
    elt('div', null, 'by ', elt('strong', null, talk.presenter)),
    elt('p', null, talk.summary),
    ...talk.comments.map(renderComment),
    elt(
      'form',
      {
        onsubmit(event) {
          event.preventDefault();
          let form = event.target;
          dispatch({ type: 'newComment', talk: talk.title, message: form.elements.comment.value });
          form.reset();
        }
      },
      elt('input', { type: 'text', name: 'comment' }),
      ' ',
      elt('button', { type: 'submit' }, 'Add comment')
    )
  );
}

// The "submit" event handler calls form.reset to clear the form’s content after creating a "newComment" action.

// When creating moderately complex pieces of DOM, this style of programming starts to look rather messy. There’s a widely used (non-standard) JavaScript extension called JSX that lets you write HTML directly in your scripts, which can make such code prettier (depending on what you consider pretty). Before you can actually run such code, you have to run a program on your script to convert the pseudo-HTML into JavaScript function calls much like the ones we use here.

// Comments are simpler to render.

function renderComment(comment) {
  return elt('p', { className: 'comment' }, elt('strong', null, comment.author), ': ', comment.message);
}

// Finally, the form that the user can use to create a new talk is rendered like this:

function renderTalkForm(dispatch) {
  let title = elt('input', { type: 'text' });
  let summary = elt('input', { type: 'text' });
  return elt(
    'form',
    {
      onsubmit(event) {
        event.preventDefault();
        dispatch({ type: 'newTalk', title: title.value, summary: summary.value });
        event.target.reset();
      }
    },
    elt('h3', null, 'Submit a Talk'),
    elt('label', null, 'Title: ', title),
    elt('label', null, 'Summary: ', summary),
    elt('button', { type: 'submit' }, 'Submit')
  );
}
