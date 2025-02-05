!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], e)
    : e(
        ((t = 'undefined' != typeof globalThis ? globalThis : t || self).Core =
          {})
      )
})(this, function (t) {
  'use strict'
  var e =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
      ? self
      : {}
  function n(t) {
    if (t.__esModule) return t
    var e = t.default
    if ('function' == typeof e) {
      var n = function t() {
        if (this instanceof t) {
          var n = [null]
          return n.push.apply(n, arguments), new (Function.bind.apply(e, n))()
        }
        return e.apply(this, arguments)
      }
      n.prototype = e.prototype
    } else n = {}
    return (
      Object.defineProperty(n, '__esModule', { value: !0 }),
      Object.keys(t).forEach(function (e) {
        var r = Object.getOwnPropertyDescriptor(t, e)
        Object.defineProperty(
          n,
          e,
          r.get
            ? r
            : {
                enumerable: !0,
                get: function () {
                  return t[e]
                }
              }
        )
      }),
      n
    )
  }
  var r,
    o = {},
    i = {}
  var a =
      'An invariant failed, however the error is obfuscated because this is a production build.',
    s = []
  Object.freeze(s)
  var u = {}
  function l() {
    return ++jt.mobxGuid
  }
  function c(t) {
    throw (d(!1, t), 'X')
  }
  function d(t, e) {
    if (!t) throw new Error('[mobx] ' + (e || a))
  }
  function p(t) {
    var e = !1
    return function () {
      if (!e) return (e = !0), t.apply(this, arguments)
    }
  }
  Object.freeze(u)
  var h = function () {}
  function f(t) {
    return null !== t && 'object' == typeof t
  }
  function v(t) {
    if (null === t || 'object' != typeof t) return !1
    var e = Object.getPrototypeOf(t)
    return e === Object.prototype || null === e
  }
  function y(t, e, n) {
    Object.defineProperty(t, e, {
      enumerable: !1,
      writable: !0,
      configurable: !0,
      value: n
    })
  }
  function g(t, e) {
    var n = 'isMobX' + t
    return (
      (e.prototype[n] = !0),
      function (t) {
        return f(t) && !0 === t[n]
      }
    )
  }
  function _(t) {
    return t instanceof Map
  }
  function m(t) {
    return t instanceof Set
  }
  function b(t) {
    var e = new Set()
    for (var n in t) e.add(n)
    return (
      Object.getOwnPropertySymbols(t).forEach(function (n) {
        Object.getOwnPropertyDescriptor(t, n).enumerable && e.add(n)
      }),
      Array.from(e)
    )
  }
  function x(t) {
    return t && t.toString ? t.toString() : new String(t).toString()
  }
  function E(t) {
    return null === t ? null : 'object' == typeof t ? '' + t : t
  }
  var M =
      'undefined' != typeof Reflect && Reflect.ownKeys
        ? Reflect.ownKeys
        : Object.getOwnPropertySymbols
        ? function (t) {
            return Object.getOwnPropertyNames(t).concat(
              Object.getOwnPropertySymbols(t)
            )
          }
        : Object.getOwnPropertyNames,
    T = Symbol('mobx administration'),
    S = (function () {
      function t(t) {
        void 0 === t && (t = 'Atom@' + l()),
          (this.name = t),
          (this.isPendingUnobservation = !1),
          (this.isBeingObserved = !1),
          (this.observers = new Set()),
          (this.diffValue = 0),
          (this.lastAccessedBy = 0),
          (this.lowestObserverState = Q.NOT_TRACKING)
      }
      return (
        (t.prototype.onBecomeObserved = function () {
          this.onBecomeObservedListeners &&
            this.onBecomeObservedListeners.forEach(function (t) {
              return t()
            })
        }),
        (t.prototype.onBecomeUnobserved = function () {
          this.onBecomeUnobservedListeners &&
            this.onBecomeUnobservedListeners.forEach(function (t) {
              return t()
            })
        }),
        (t.prototype.reportObserved = function () {
          return Ht(this)
        }),
        (t.prototype.reportChanged = function () {
          zt(),
            (function (t) {
              if (t.lowestObserverState === Q.STALE) return
              ;(t.lowestObserverState = Q.STALE),
                t.observers.forEach(function (e) {
                  e.dependenciesState === Q.UP_TO_DATE &&
                    (e.isTracing !== tt.NONE && Xt(e, t), e.onBecomeStale()),
                    (e.dependenciesState = Q.STALE)
                })
            })(this),
            Ut()
        }),
        (t.prototype.toString = function () {
          return this.name
        }),
        t
      )
    })(),
    w = g('Atom', S)
  function A(t, e, n) {
    void 0 === e && (e = h), void 0 === n && (n = h)
    var r = new S(t)
    return e !== h && se(r, e), n !== h && ue(r, n), r
  }
  var O = {
      identity: function (t, e) {
        return t === e
      },
      structural: function (t, e) {
        return _n(t, e)
      },
      default: function (t, e) {
        return Object.is(t, e)
      },
      shallow: function (t, e) {
        return _n(t, e, 1)
      }
    },
    D = function (t, e) {
      return (
        (D =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e
            }) ||
          function (t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
          }),
        D(t, e)
      )
    }
  var N = function () {
    return (
      (N =
        Object.assign ||
        function (t) {
          for (var e, n = 1, r = arguments.length; n < r; n++)
            for (var o in (e = arguments[n]))
              Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
          return t
        }),
      N.apply(this, arguments)
    )
  }
  function P(t) {
    var e = 'function' == typeof Symbol && t[Symbol.iterator],
      n = 0
    return e
      ? e.call(t)
      : {
          next: function () {
            return (
              t && n >= t.length && (t = void 0),
              { value: t && t[n++], done: !t }
            )
          }
        }
  }
  function C(t, e) {
    var n = 'function' == typeof Symbol && t[Symbol.iterator]
    if (!n) return t
    var r,
      o,
      i = n.call(t),
      a = []
    try {
      for (; (void 0 === e || e-- > 0) && !(r = i.next()).done; )
        a.push(r.value)
    } catch (t) {
      o = { error: t }
    } finally {
      try {
        r && !r.done && (n = i.return) && n.call(i)
      } finally {
        if (o) throw o.error
      }
    }
    return a
  }
  function I() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t = t.concat(C(arguments[e]))
    return t
  }
  var L = Symbol('mobx did run lazy initializers'),
    j = Symbol('mobx pending decorators'),
    R = {},
    k = {}
  function B(t) {
    var e, n
    if (!0 !== t[L]) {
      var r = t[j]
      if (r) {
        y(t, L, !0)
        var o = I(Object.getOwnPropertySymbols(r), Object.keys(r))
        try {
          for (var i = P(o), a = i.next(); !a.done; a = i.next()) {
            var s = r[a.value]
            s.propertyCreator(
              t,
              s.prop,
              s.descriptor,
              s.decoratorTarget,
              s.decoratorArguments
            )
          }
        } catch (t) {
          e = { error: t }
        } finally {
          try {
            a && !a.done && (n = i.return) && n.call(i)
          } finally {
            if (e) throw e.error
          }
        }
      }
    }
  }
  function z(t, e) {
    return function () {
      var n,
        r,
        o = function (r, o, i, a) {
          if (!0 === a) return e(r, o, i, r, n), null
          if (!Object.prototype.hasOwnProperty.call(r, j)) {
            var s = r[j]
            y(r, j, N({}, s))
          }
          return (
            (r[j][o] = {
              prop: o,
              propertyCreator: e,
              descriptor: i,
              decoratorTarget: r,
              decoratorArguments: n
            }),
            (function (t, e) {
              var n = e ? R : k
              return (
                n[t] ||
                (n[t] = {
                  configurable: !0,
                  enumerable: e,
                  get: function () {
                    return B(this), this[t]
                  },
                  set: function (e) {
                    B(this), (this[t] = e)
                  }
                })
              )
            })(o, t)
          )
        }
      return ((2 === (r = arguments).length || 3 === r.length) &&
        ('string' == typeof r[1] || 'symbol' == typeof r[1])) ||
        (4 === r.length && !0 === r[3])
        ? ((n = s), o.apply(null, arguments))
        : ((n = Array.prototype.slice.call(arguments)), o)
    }
  }
  function U(t, e, n) {
    return Te(t)
      ? t
      : Array.isArray(t)
      ? $.array(t, { name: n })
      : v(t)
      ? $.object(t, void 0, { name: n })
      : _(t)
      ? $.map(t, { name: n })
      : m(t)
      ? $.set(t, { name: n })
      : t
  }
  function H(t) {
    return t
  }
  function X(t) {
    d(t)
    var e = z(!0, function (e, n, r, o, i) {
        var a = r ? (r.initializer ? r.initializer.call(e) : r.value) : void 0
        un(e).addObservableProp(n, a, t)
      }),
      n = ('undefined' != typeof process && process.env, e)
    return (n.enhancer = t), n
  }
  var G = { deep: !0, name: void 0, defaultDecorator: void 0, proxy: !0 }
  function W(t) {
    return null == t
      ? G
      : 'string' == typeof t
      ? { name: t, deep: !0, proxy: !0 }
      : t
  }
  Object.freeze(G)
  var Y = X(U),
    F = X(function (t, e, n) {
      return null == t || hn(t) || Je(t) || nn(t) || an(t)
        ? t
        : Array.isArray(t)
        ? $.array(t, { name: n, deep: !1 })
        : v(t)
        ? $.object(t, void 0, { name: n, deep: !1 })
        : _(t)
        ? $.map(t, { name: n, deep: !1 })
        : m(t)
        ? $.set(t, { name: n, deep: !1 })
        : c(!1)
    }),
    V = X(H),
    K = X(function (t, e, n) {
      return _n(t, e) ? e : t
    })
  function q(t) {
    return t.defaultDecorator
      ? t.defaultDecorator.enhancer
      : !1 === t.deep
      ? H
      : U
  }
  var Z = {
      box: function (t, e) {
        arguments.length > 2 && J('box')
        var n = W(e)
        return new St(t, q(n), n.name, !0, n.equals)
      },
      array: function (t, e) {
        arguments.length > 2 && J('array')
        var n = W(e)
        return (function (t, e, n, r) {
          void 0 === n && (n = 'ObservableArray@' + l())
          void 0 === r && (r = !1)
          var o = new Ke(n, e, r)
          !(function (t, e, n) {
            Object.defineProperty(t, e, {
              enumerable: !1,
              writable: !1,
              configurable: !0,
              value: n
            })
          })(o.values, T, o)
          var i = new Proxy(o.values, Ve)
          if (((o.proxy = i), t && t.length)) {
            var a = Mt(!0)
            o.spliceWithArray(0, 0, t), Tt(a)
          }
          return i
        })(t, q(n), n.name)
      },
      map: function (t, e) {
        arguments.length > 2 && J('map')
        var n = W(e)
        return new en(t, q(n), n.name)
      },
      set: function (t, e) {
        arguments.length > 2 && J('set')
        var n = W(e)
        return new on(t, q(n), n.name)
      },
      object: function (t, e, n) {
        'string' == typeof arguments[1] && J('object')
        var r = W(n)
        if (!1 === r.proxy) return de({}, t, e, r)
        var o = pe(r),
          i = (function (t) {
            var e = new Proxy(t, Ue)
            return (t[T].proxy = e), e
          })(de({}, void 0, void 0, r))
        return he(i, t, e, o), i
      },
      ref: V,
      shallow: F,
      deep: Y,
      struct: K
    },
    $ = function (t, e, n) {
      if ('string' == typeof arguments[1] || 'symbol' == typeof arguments[1])
        return Y.apply(null, arguments)
      if (Te(t)) return t
      var r = v(t)
        ? $.object(t, e, n)
        : Array.isArray(t)
        ? $.array(t, e)
        : _(t)
        ? $.map(t, e)
        : m(t)
        ? $.set(t, e)
        : t
      if (r !== t) return r
      c(!1)
    }
  function J(t) {
    c(
      'Expected one or two arguments to observable.' +
        t +
        '. Did you accidentally try to use observable.' +
        t +
        ' as decorator?'
    )
  }
  Object.keys(Z).forEach(function (t) {
    return ($[t] = Z[t])
  })
  var Q,
    tt,
    et = z(!1, function (t, e, n, r, o) {
      var i = n.get,
        a = n.set,
        s = o[0] || {}
      un(t).addComputedProp(t, e, N({ get: i, set: a, context: t }, s))
    }),
    nt = et({ equals: O.structural }),
    rt = function (t, e, n) {
      if ('string' == typeof e) return et.apply(null, arguments)
      if (null !== t && 'object' == typeof t && 1 === arguments.length)
        return et.apply(null, arguments)
      var r = 'object' == typeof e ? e : {}
      return (
        (r.get = t),
        (r.set = 'function' == typeof e ? e : r.set),
        (r.name = r.name || t.name || ''),
        new At(r)
      )
    }
  ;(rt.struct = nt),
    (function (t) {
      ;(t[(t.NOT_TRACKING = -1)] = 'NOT_TRACKING'),
        (t[(t.UP_TO_DATE = 0)] = 'UP_TO_DATE'),
        (t[(t.POSSIBLY_STALE = 1)] = 'POSSIBLY_STALE'),
        (t[(t.STALE = 2)] = 'STALE')
    })(Q || (Q = {})),
    (function (t) {
      ;(t[(t.NONE = 0)] = 'NONE'),
        (t[(t.LOG = 1)] = 'LOG'),
        (t[(t.BREAK = 2)] = 'BREAK')
    })(tt || (tt = {}))
  var ot = function (t) {
    this.cause = t
  }
  function it(t) {
    return t instanceof ot
  }
  function at(t) {
    switch (t.dependenciesState) {
      case Q.UP_TO_DATE:
        return !1
      case Q.NOT_TRACKING:
      case Q.STALE:
        return !0
      case Q.POSSIBLY_STALE:
        for (
          var e = ht(!0), n = dt(), r = t.observing, o = r.length, i = 0;
          i < o;
          i++
        ) {
          var a = r[i]
          if (Ot(a)) {
            if (jt.disableErrorBoundaries) a.get()
            else
              try {
                a.get()
              } catch (t) {
                return pt(n), ft(e), !0
              }
            if (t.dependenciesState === Q.STALE) return pt(n), ft(e), !0
          }
        }
        return vt(t), pt(n), ft(e), !1
    }
  }
  function st(t) {
    var e = t.observers.size > 0
    jt.computationDepth > 0 && e && c(!1),
      jt.allowStateChanges || (!e && 'strict' !== jt.enforceActions) || c(!1)
  }
  function ut(t, e, n) {
    var r = ht(!0)
    vt(t),
      (t.newObserving = new Array(t.observing.length + 100)),
      (t.unboundDepsCount = 0),
      (t.runId = ++jt.runId)
    var o,
      i = jt.trackingDerivation
    if (((jt.trackingDerivation = t), !0 === jt.disableErrorBoundaries))
      o = e.call(n)
    else
      try {
        o = e.call(n)
      } catch (t) {
        o = new ot(t)
      }
    return (
      (jt.trackingDerivation = i),
      (function (t) {
        for (
          var e = t.observing,
            n = (t.observing = t.newObserving),
            r = Q.UP_TO_DATE,
            o = 0,
            i = t.unboundDepsCount,
            a = 0;
          a < i;
          a++
        ) {
          0 === (s = n[a]).diffValue &&
            ((s.diffValue = 1), o !== a && (n[o] = s), o++),
            s.dependenciesState > r && (r = s.dependenciesState)
        }
        ;(n.length = o), (t.newObserving = null), (i = e.length)
        for (; i--; ) {
          0 === (s = e[i]).diffValue && kt(s, t), (s.diffValue = 0)
        }
        for (; o--; ) {
          var s
          1 === (s = n[o]).diffValue && ((s.diffValue = 0), Rt(s, t))
        }
        r !== Q.UP_TO_DATE && ((t.dependenciesState = r), t.onBecomeStale())
      })(t),
      ft(r),
      o
    )
  }
  function lt(t) {
    var e = t.observing
    t.observing = []
    for (var n = e.length; n--; ) kt(e[n], t)
    t.dependenciesState = Q.NOT_TRACKING
  }
  function ct(t) {
    var e = dt()
    try {
      return t()
    } finally {
      pt(e)
    }
  }
  function dt() {
    var t = jt.trackingDerivation
    return (jt.trackingDerivation = null), t
  }
  function pt(t) {
    jt.trackingDerivation = t
  }
  function ht(t) {
    var e = jt.allowStateReads
    return (jt.allowStateReads = t), e
  }
  function ft(t) {
    jt.allowStateReads = t
  }
  function vt(t) {
    if (t.dependenciesState !== Q.UP_TO_DATE) {
      t.dependenciesState = Q.UP_TO_DATE
      for (var e = t.observing, n = e.length; n--; )
        e[n].lowestObserverState = Q.UP_TO_DATE
    }
  }
  var yt = 0,
    gt = 1,
    _t = Object.getOwnPropertyDescriptor(function () {}, 'name')
  function mt(t, e, n) {
    var r = function () {
      return bt(t, e, n || this, arguments)
    }
    return (r.isMobxAction = !0), r
  }
  function bt(t, e, n, r) {
    var o = xt()
    try {
      return e.apply(n, r)
    } catch (t) {
      throw ((o.error = t), t)
    } finally {
      Et(o)
    }
  }
  function xt(t, e, n) {
    var r = dt()
    zt()
    var o = {
      prevDerivation: r,
      prevAllowStateChanges: Mt(!0),
      prevAllowStateReads: ht(!0),
      notifySpy: false,
      startTime: 0,
      actionId: gt++,
      parentActionId: yt
    }
    return (yt = o.actionId), o
  }
  function Et(t) {
    yt !== t.actionId &&
      c('invalid action stack. did you forget to finish an action?'),
      (yt = t.parentActionId),
      void 0 !== t.error && (jt.suppressReactionErrors = !0),
      Tt(t.prevAllowStateChanges),
      ft(t.prevAllowStateReads),
      Ut(),
      pt(t.prevDerivation),
      t.notifySpy,
      (jt.suppressReactionErrors = !1)
  }
  function Mt(t) {
    var e = jt.allowStateChanges
    return (jt.allowStateChanges = t), e
  }
  function Tt(t) {
    jt.allowStateChanges = t
  }
  _t && _t.configurable
  var St = (function (t) {
      function e(e, n, r, o, i) {
        void 0 === r && (r = 'ObservableValue@' + l()),
          void 0 === o && (o = !0),
          void 0 === i && (i = O.default)
        var a = t.call(this, r) || this
        return (
          (a.enhancer = n),
          (a.name = r),
          (a.equals = i),
          (a.hasUnreportedChange = !1),
          (a.value = n(e, void 0, r)),
          a
        )
      }
      return (
        (function (t, e) {
          function n() {
            this.constructor = t
          }
          D(t, e),
            (t.prototype =
              null === e
                ? Object.create(e)
                : ((n.prototype = e.prototype), new n()))
        })(e, t),
        (e.prototype.dehanceValue = function (t) {
          return void 0 !== this.dehancer ? this.dehancer(t) : t
        }),
        (e.prototype.set = function (t) {
          this.value
          if ((t = this.prepareNewValue(t)) !== jt.UNCHANGED) {
            false, this.setNewValue(t)
          }
        }),
        (e.prototype.prepareNewValue = function (t) {
          if ((st(this), He(this))) {
            var e = Ge(this, { object: this, type: 'update', newValue: t })
            if (!e) return jt.UNCHANGED
            t = e.newValue
          }
          return (
            (t = this.enhancer(t, this.value, this.name)),
            this.equals(this.value, t) ? jt.UNCHANGED : t
          )
        }),
        (e.prototype.setNewValue = function (t) {
          var e = this.value
          ;(this.value = t),
            this.reportChanged(),
            We(this) &&
              Fe(this, {
                type: 'update',
                object: this,
                newValue: t,
                oldValue: e
              })
        }),
        (e.prototype.get = function () {
          return this.reportObserved(), this.dehanceValue(this.value)
        }),
        (e.prototype.intercept = function (t) {
          return Xe(this, t)
        }),
        (e.prototype.observe = function (t, e) {
          return (
            e &&
              t({
                object: this,
                type: 'update',
                newValue: this.value,
                oldValue: void 0
              }),
            Ye(this, t)
          )
        }),
        (e.prototype.toJSON = function () {
          return this.get()
        }),
        (e.prototype.toString = function () {
          return this.name + '[' + this.value + ']'
        }),
        (e.prototype.valueOf = function () {
          return E(this.get())
        }),
        (e.prototype[Symbol.toPrimitive] = function () {
          return this.valueOf()
        }),
        e
      )
    })(S),
    wt = g('ObservableValue', St),
    At = (function () {
      function t(t) {
        ;(this.dependenciesState = Q.NOT_TRACKING),
          (this.observing = []),
          (this.newObserving = null),
          (this.isBeingObserved = !1),
          (this.isPendingUnobservation = !1),
          (this.observers = new Set()),
          (this.diffValue = 0),
          (this.runId = 0),
          (this.lastAccessedBy = 0),
          (this.lowestObserverState = Q.UP_TO_DATE),
          (this.unboundDepsCount = 0),
          (this.__mapid = '#' + l()),
          (this.value = new ot(null)),
          (this.isComputing = !1),
          (this.isRunningSetter = !1),
          (this.isTracing = tt.NONE),
          d(t.get, 'missing option for computed: get'),
          (this.derivation = t.get),
          (this.name = t.name || 'ComputedValue@' + l()),
          t.set && (this.setter = mt(this.name + '-setter', t.set)),
          (this.equals =
            t.equals ||
            (t.compareStructural || t.struct ? O.structural : O.default)),
          (this.scope = t.context),
          (this.requiresReaction = !!t.requiresReaction),
          (this.keepAlive = !!t.keepAlive)
      }
      return (
        (t.prototype.onBecomeStale = function () {
          !(function (t) {
            if (t.lowestObserverState !== Q.UP_TO_DATE) return
            ;(t.lowestObserverState = Q.POSSIBLY_STALE),
              t.observers.forEach(function (e) {
                e.dependenciesState === Q.UP_TO_DATE &&
                  ((e.dependenciesState = Q.POSSIBLY_STALE),
                  e.isTracing !== tt.NONE && Xt(e, t),
                  e.onBecomeStale())
              })
          })(this)
        }),
        (t.prototype.onBecomeObserved = function () {
          this.onBecomeObservedListeners &&
            this.onBecomeObservedListeners.forEach(function (t) {
              return t()
            })
        }),
        (t.prototype.onBecomeUnobserved = function () {
          this.onBecomeUnobservedListeners &&
            this.onBecomeUnobservedListeners.forEach(function (t) {
              return t()
            })
        }),
        (t.prototype.get = function () {
          this.isComputing &&
            c(
              'Cycle detected in computation ' +
                this.name +
                ': ' +
                this.derivation
            ),
            0 !== jt.inBatch || 0 !== this.observers.size || this.keepAlive
              ? (Ht(this),
                at(this) &&
                  this.trackAndCompute() &&
                  (function (t) {
                    if (t.lowestObserverState === Q.STALE) return
                    ;(t.lowestObserverState = Q.STALE),
                      t.observers.forEach(function (e) {
                        e.dependenciesState === Q.POSSIBLY_STALE
                          ? (e.dependenciesState = Q.STALE)
                          : e.dependenciesState === Q.UP_TO_DATE &&
                            (t.lowestObserverState = Q.UP_TO_DATE)
                      })
                  })(this))
              : at(this) &&
                (this.warnAboutUntrackedRead(),
                zt(),
                (this.value = this.computeValue(!1)),
                Ut())
          var t = this.value
          if (it(t)) throw t.cause
          return t
        }),
        (t.prototype.peek = function () {
          var t = this.computeValue(!1)
          if (it(t)) throw t.cause
          return t
        }),
        (t.prototype.set = function (t) {
          if (this.setter) {
            d(
              !this.isRunningSetter,
              "The setter of computed value '" +
                this.name +
                "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?"
            ),
              (this.isRunningSetter = !0)
            try {
              this.setter.call(this.scope, t)
            } finally {
              this.isRunningSetter = !1
            }
          } else d(!1, !1)
        }),
        (t.prototype.trackAndCompute = function () {
          var t = this.value,
            e = this.dependenciesState === Q.NOT_TRACKING,
            n = this.computeValue(!0),
            r = e || it(t) || it(n) || !this.equals(t, n)
          return r && (this.value = n), r
        }),
        (t.prototype.computeValue = function (t) {
          var e
          if (((this.isComputing = !0), jt.computationDepth++, t))
            e = ut(this, this.derivation, this.scope)
          else if (!0 === jt.disableErrorBoundaries)
            e = this.derivation.call(this.scope)
          else
            try {
              e = this.derivation.call(this.scope)
            } catch (t) {
              e = new ot(t)
            }
          return jt.computationDepth--, (this.isComputing = !1), e
        }),
        (t.prototype.suspend = function () {
          this.keepAlive || (lt(this), (this.value = void 0))
        }),
        (t.prototype.observe = function (t, e) {
          var n = this,
            r = !0,
            o = void 0
          return re(function () {
            var i = n.get()
            if (!r || e) {
              var a = dt()
              t({ type: 'update', object: n, newValue: i, oldValue: o }), pt(a)
            }
            ;(r = !1), (o = i)
          })
        }),
        (t.prototype.warnAboutUntrackedRead = function () {}),
        (t.prototype.toJSON = function () {
          return this.get()
        }),
        (t.prototype.toString = function () {
          return this.name + '[' + this.derivation.toString() + ']'
        }),
        (t.prototype.valueOf = function () {
          return E(this.get())
        }),
        (t.prototype[Symbol.toPrimitive] = function () {
          return this.valueOf()
        }),
        t
      )
    })(),
    Ot = g('ComputedValue', At),
    Dt = [
      'mobxGuid',
      'spyListeners',
      'enforceActions',
      'computedRequiresReaction',
      'reactionRequiresObservable',
      'observableRequiresReaction',
      'allowStateReads',
      'disableErrorBoundaries',
      'runId',
      'UNCHANGED'
    ],
    Nt = function () {
      ;(this.version = 5),
        (this.UNCHANGED = {}),
        (this.trackingDerivation = null),
        (this.computationDepth = 0),
        (this.runId = 0),
        (this.mobxGuid = 0),
        (this.inBatch = 0),
        (this.pendingUnobservations = []),
        (this.pendingReactions = []),
        (this.isRunningReactions = !1),
        (this.allowStateChanges = !0),
        (this.allowStateReads = !0),
        (this.enforceActions = !1),
        (this.spyListeners = []),
        (this.globalReactionErrorHandlers = []),
        (this.computedRequiresReaction = !1),
        (this.reactionRequiresObservable = !1),
        (this.observableRequiresReaction = !1),
        (this.computedConfigurable = !1),
        (this.disableErrorBoundaries = !1),
        (this.suppressReactionErrors = !1)
    },
    Pt = {}
  function Ct() {
    return 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
      ? self
      : Pt
  }
  var It = !0,
    Lt = !1,
    jt = (function () {
      var t = Ct()
      return (
        t.__mobxInstanceCount > 0 && !t.__mobxGlobals && (It = !1),
        t.__mobxGlobals &&
          t.__mobxGlobals.version !== new Nt().version &&
          (It = !1),
        It
          ? t.__mobxGlobals
            ? ((t.__mobxInstanceCount += 1),
              t.__mobxGlobals.UNCHANGED || (t.__mobxGlobals.UNCHANGED = {}),
              t.__mobxGlobals)
            : ((t.__mobxInstanceCount = 1), (t.__mobxGlobals = new Nt()))
          : (setTimeout(function () {
              Lt ||
                c(
                  'There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`'
                )
            }, 1),
            new Nt())
      )
    })()
  function Rt(t, e) {
    t.observers.add(e),
      t.lowestObserverState > e.dependenciesState &&
        (t.lowestObserverState = e.dependenciesState)
  }
  function kt(t, e) {
    t.observers.delete(e), 0 === t.observers.size && Bt(t)
  }
  function Bt(t) {
    !1 === t.isPendingUnobservation &&
      ((t.isPendingUnobservation = !0), jt.pendingUnobservations.push(t))
  }
  function zt() {
    jt.inBatch++
  }
  function Ut() {
    if (0 == --jt.inBatch) {
      Vt()
      for (var t = jt.pendingUnobservations, e = 0; e < t.length; e++) {
        var n = t[e]
        ;(n.isPendingUnobservation = !1),
          0 === n.observers.size &&
            (n.isBeingObserved &&
              ((n.isBeingObserved = !1), n.onBecomeUnobserved()),
            n instanceof At && n.suspend())
      }
      jt.pendingUnobservations = []
    }
  }
  function Ht(t) {
    var e = jt.trackingDerivation
    return null !== e
      ? (e.runId !== t.lastAccessedBy &&
          ((t.lastAccessedBy = e.runId),
          (e.newObserving[e.unboundDepsCount++] = t),
          t.isBeingObserved ||
            ((t.isBeingObserved = !0), t.onBecomeObserved())),
        !0)
      : (0 === t.observers.size && jt.inBatch > 0 && Bt(t), !1)
  }
  function Xt(t, e) {
    if (t.isTracing === tt.BREAK) {
      var n = []
      Gt(fe(t), n, 1),
        new Function(
          "debugger;\n/*\nTracing '" +
            t.name +
            "'\n\nYou are entering this break point because derivation '" +
            t.name +
            "' is being traced and '" +
            e.name +
            "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" +
            (t instanceof At
              ? t.derivation.toString().replace(/[*]\//g, '/')
              : '') +
            '\n\nThe dependencies for this derivation are:\n\n' +
            n.join('\n') +
            '\n*/\n    '
        )()
    }
  }
  function Gt(t, e, n) {
    e.length >= 1e3
      ? e.push('(and many more)')
      : (e.push('' + new Array(n).join('\t') + t.name),
        t.dependencies &&
          t.dependencies.forEach(function (t) {
            return Gt(t, e, n + 1)
          }))
  }
  var Wt = (function () {
    function t(t, e, n, r) {
      void 0 === t && (t = 'Reaction@' + l()),
        void 0 === r && (r = !1),
        (this.name = t),
        (this.onInvalidate = e),
        (this.errorHandler = n),
        (this.requiresObservable = r),
        (this.observing = []),
        (this.newObserving = []),
        (this.dependenciesState = Q.NOT_TRACKING),
        (this.diffValue = 0),
        (this.runId = 0),
        (this.unboundDepsCount = 0),
        (this.__mapid = '#' + l()),
        (this.isDisposed = !1),
        (this._isScheduled = !1),
        (this._isTrackPending = !1),
        (this._isRunning = !1),
        (this.isTracing = tt.NONE)
    }
    return (
      (t.prototype.onBecomeStale = function () {
        this.schedule()
      }),
      (t.prototype.schedule = function () {
        this._isScheduled ||
          ((this._isScheduled = !0), jt.pendingReactions.push(this), Vt())
      }),
      (t.prototype.isScheduled = function () {
        return this._isScheduled
      }),
      (t.prototype.runReaction = function () {
        if (!this.isDisposed) {
          if ((zt(), (this._isScheduled = !1), at(this))) {
            this._isTrackPending = !0
            try {
              this.onInvalidate(), this._isTrackPending
            } catch (t) {
              this.reportExceptionInDerivation(t)
            }
          }
          Ut()
        }
      }),
      (t.prototype.track = function (t) {
        if (!this.isDisposed) {
          zt(), (this._isRunning = !0)
          var e = ut(this, t, void 0)
          ;(this._isRunning = !1),
            (this._isTrackPending = !1),
            this.isDisposed && lt(this),
            it(e) && this.reportExceptionInDerivation(e.cause),
            Ut()
        }
      }),
      (t.prototype.reportExceptionInDerivation = function (t) {
        var e = this
        if (this.errorHandler) this.errorHandler(t, this)
        else {
          if (jt.disableErrorBoundaries) throw t
          jt.suppressReactionErrors,
            jt.globalReactionErrorHandlers.forEach(function (n) {
              return n(t, e)
            })
        }
      }),
      (t.prototype.dispose = function () {
        this.isDisposed ||
          ((this.isDisposed = !0), this._isRunning || (zt(), lt(this), Ut()))
      }),
      (t.prototype.getDisposer = function () {
        var t = this.dispose.bind(this)
        return (t[T] = this), t
      }),
      (t.prototype.toString = function () {
        return 'Reaction[' + this.name + ']'
      }),
      (t.prototype.trace = function (t) {
        void 0 === t && (t = !1), je(this, t)
      }),
      t
    )
  })()
  var Yt = 100,
    Ft = function (t) {
      return t()
    }
  function Vt() {
    jt.inBatch > 0 || jt.isRunningReactions || Ft(Kt)
  }
  function Kt() {
    jt.isRunningReactions = !0
    for (var t = jt.pendingReactions, e = 0; t.length > 0; ) {
      ++e === Yt && t.splice(0)
      for (var n = t.splice(0), r = 0, o = n.length; r < o; r++)
        n[r].runReaction()
    }
    jt.isRunningReactions = !1
  }
  var qt = g('Reaction', Wt)
  function Zt(t) {
    var e = Ft
    Ft = function (n) {
      return t(function () {
        return e(n)
      })
    }
  }
  function $t(t) {
    return function () {}
  }
  function Jt() {
    c(!1)
  }
  function Qt(t) {
    return function (e, n, r) {
      if (r) {
        if (r.value)
          return {
            value: mt(t, r.value),
            enumerable: !1,
            configurable: !0,
            writable: !0
          }
        var o = r.initializer
        return {
          enumerable: !1,
          configurable: !0,
          writable: !0,
          initializer: function () {
            return mt(t, o.call(this))
          }
        }
      }
      return (function (t) {
        return function (e, n, r) {
          Object.defineProperty(e, n, {
            configurable: !0,
            enumerable: !1,
            get: function () {},
            set: function (e) {
              y(this, n, te(t, e))
            }
          })
        }
      })(t).apply(this, arguments)
    }
  }
  var te = function (t, e, n, r) {
    return 1 === arguments.length && 'function' == typeof t
      ? mt(t.name || '<unnamed action>', t)
      : 2 === arguments.length && 'function' == typeof e
      ? mt(t, e)
      : 1 === arguments.length && 'string' == typeof t
      ? Qt(t)
      : !0 !== r
      ? Qt(e).apply(null, arguments)
      : void y(t, e, mt(t.name || e, n.value, this))
  }
  function ee(t, e) {
    'string' == typeof t || t.name
    return bt(0, 'function' == typeof t ? t : e, this, void 0)
  }
  function ne(t, e, n) {
    y(t, e, mt(e, n.bind(t)))
  }
  function re(t, e) {
    void 0 === e && (e = u)
    var n,
      r = (e && e.name) || t.name || 'Autorun@' + l()
    if (!e.scheduler && !e.delay)
      n = new Wt(
        r,
        function () {
          this.track(a)
        },
        e.onError,
        e.requiresObservable
      )
    else {
      var o = ie(e),
        i = !1
      n = new Wt(
        r,
        function () {
          i ||
            ((i = !0),
            o(function () {
              ;(i = !1), n.isDisposed || n.track(a)
            }))
        },
        e.onError,
        e.requiresObservable
      )
    }
    function a() {
      t(n)
    }
    return n.schedule(), n.getDisposer()
  }
  te.bound = function (t, e, n, r) {
    return !0 === r
      ? (ne(t, e, n.value), null)
      : n
      ? {
          configurable: !0,
          enumerable: !1,
          get: function () {
            return ne(this, e, n.value || n.initializer.call(this)), this[e]
          },
          set: Jt
        }
      : {
          enumerable: !1,
          configurable: !0,
          set: function (t) {
            ne(this, e, t)
          },
          get: function () {}
        }
  }
  var oe = function (t) {
    return t()
  }
  function ie(t) {
    return t.scheduler
      ? t.scheduler
      : t.delay
      ? function (e) {
          return setTimeout(e, t.delay)
        }
      : oe
  }
  function ae(t, e, n) {
    void 0 === n && (n = u)
    var r,
      o,
      i,
      a = n.name || 'Reaction@' + l(),
      s = te(
        a,
        n.onError
          ? ((r = n.onError),
            (o = e),
            function () {
              try {
                return o.apply(this, arguments)
              } catch (t) {
                r.call(this, t)
              }
            })
          : e
      ),
      c = !n.scheduler && !n.delay,
      d = ie(n),
      p = !0,
      h = !1,
      f = n.compareStructural ? O.structural : n.equals || O.default,
      v = new Wt(
        a,
        function () {
          p || c ? y() : h || ((h = !0), d(y))
        },
        n.onError,
        n.requiresObservable
      )
    function y() {
      if (((h = !1), !v.isDisposed)) {
        var e = !1
        v.track(function () {
          var n = t(v)
          ;(e = p || !f(i, n)), (i = n)
        }),
          p && n.fireImmediately && s(i, v),
          p || !0 !== e || s(i, v),
          p && (p = !1)
      }
    }
    return v.schedule(), v.getDisposer()
  }
  function se(t, e, n) {
    return le('onBecomeObserved', t, e, n)
  }
  function ue(t, e, n) {
    return le('onBecomeUnobserved', t, e, n)
  }
  function le(t, e, n, r) {
    var o = 'function' == typeof r ? fn(e, n) : fn(e),
      i = 'function' == typeof r ? r : n,
      a = t + 'Listeners'
    return (
      o[a] ? o[a].add(i) : (o[a] = new Set([i])),
      'function' != typeof o[t]
        ? c(!1)
        : function () {
            var t = o[a]
            t && (t.delete(i), 0 === t.size && delete o[a])
          }
    )
  }
  function ce(t) {
    var e = t.enforceActions,
      n = t.computedRequiresReaction,
      r = t.computedConfigurable,
      o = t.disableErrorBoundaries,
      i = t.reactionScheduler,
      a = t.reactionRequiresObservable,
      s = t.observableRequiresReaction
    if (
      (!0 === t.isolateGlobalState &&
        ((jt.pendingReactions.length || jt.inBatch || jt.isRunningReactions) &&
          c(
            'isolateGlobalState should be called before MobX is running any reactions'
          ),
        (Lt = !0),
        It &&
          (0 == --Ct().__mobxInstanceCount && (Ct().__mobxGlobals = void 0),
          (jt = new Nt()))),
      void 0 !== e)
    ) {
      var u = void 0
      switch (e) {
        case !0:
        case 'observed':
          u = !0
          break
        case !1:
        case 'never':
          u = !1
          break
        case 'strict':
        case 'always':
          u = 'strict'
          break
        default:
          c(
            "Invalid value for 'enforceActions': '" +
              e +
              "', expected 'never', 'always' or 'observed'"
          )
      }
      ;(jt.enforceActions = u),
        (jt.allowStateChanges = !0 !== u && 'strict' !== u)
    }
    void 0 !== n && (jt.computedRequiresReaction = !!n),
      void 0 !== a && (jt.reactionRequiresObservable = !!a),
      void 0 !== s &&
        ((jt.observableRequiresReaction = !!s),
        (jt.allowStateReads = !jt.observableRequiresReaction)),
      void 0 !== r && (jt.computedConfigurable = !!r),
      void 0 !== o && (jt.disableErrorBoundaries = !!o),
      i && Zt(i)
  }
  function de(t, e, n, r) {
    var o = pe((r = W(r)))
    return B(t), un(t, r.name, o.enhancer), e && he(t, e, n, o), t
  }
  function pe(t) {
    return t.defaultDecorator || (!1 === t.deep ? V : Y)
  }
  function he(t, e, n, r) {
    var o, i
    zt()
    try {
      var a = M(e)
      try {
        for (var s = P(a), u = s.next(); !u.done; u = s.next()) {
          var l = u.value,
            c = Object.getOwnPropertyDescriptor(e, l)
          0
          var d = n && l in n ? n[l] : c.get ? et : r
          0
          var p = d(t, l, c, !0)
          p && Object.defineProperty(t, l, p)
        }
      } catch (t) {
        o = { error: t }
      } finally {
        try {
          u && !u.done && (i = s.return) && i.call(s)
        } finally {
          if (o) throw o.error
        }
      }
    } finally {
      Ut()
    }
  }
  function fe(t, e) {
    return ve(fn(t, e))
  }
  function ve(t) {
    var e,
      n,
      r = { name: t.name }
    return (
      t.observing &&
        t.observing.length > 0 &&
        (r.dependencies = ((e = t.observing),
        (n = []),
        e.forEach(function (t) {
          ;-1 === n.indexOf(t) && n.push(t)
        }),
        n).map(ve)),
      r
    )
  }
  function ye(t) {
    var e = { name: t.name }
    return (
      (function (t) {
        return t.observers && t.observers.size > 0
      })(t) &&
        (e.observers = Array.from(
          (function (t) {
            return t.observers
          })(t)
        ).map(ye)),
      e
    )
  }
  var ge = 0
  function _e() {
    this.message = 'FLOW_CANCELLED'
  }
  function me(t) {
    'function' == typeof t.cancel && t.cancel()
  }
  function be(t, e) {
    if (null == t) return !1
    if (void 0 !== e) {
      if (!1 === hn(t)) return !1
      if (!t[T].values.has(e)) return !1
      var n = fn(t, e)
      return Ot(n)
    }
    return Ot(t)
  }
  function xe(t) {
    return arguments.length > 1 ? c(!1) : be(t)
  }
  function Ee(t, e) {
    return 'string' != typeof e ? c(!1) : be(t, e)
  }
  function Me(t, e) {
    return (
      null != t &&
      (void 0 !== e
        ? !!hn(t) && t[T].values.has(e)
        : hn(t) || !!t[T] || w(t) || qt(t) || Ot(t))
    )
  }
  function Te(t) {
    return 1 !== arguments.length && c(!1), Me(t)
  }
  function Se(t) {
    return hn(t)
      ? t[T].getKeys()
      : nn(t) || an(t)
      ? Array.from(t.keys())
      : Je(t)
      ? t.map(function (t, e) {
          return e
        })
      : c(!1)
  }
  function we(t) {
    return hn(t)
      ? Se(t).map(function (e) {
          return t[e]
        })
      : nn(t)
      ? Se(t).map(function (e) {
          return t.get(e)
        })
      : an(t)
      ? Array.from(t.values())
      : Je(t)
      ? t.slice()
      : c(!1)
  }
  function Ae(t) {
    return hn(t)
      ? Se(t).map(function (e) {
          return [e, t[e]]
        })
      : nn(t)
      ? Se(t).map(function (e) {
          return [e, t.get(e)]
        })
      : an(t)
      ? Array.from(t.entries())
      : Je(t)
      ? t.map(function (t, e) {
          return [e, t]
        })
      : c(!1)
  }
  function Oe(t, e, n) {
    if (2 !== arguments.length || an(t))
      if (hn(t)) {
        var r = t[T]
        r.values.get(e)
          ? r.write(e, n)
          : r.addObservableProp(e, n, r.defaultEnhancer)
      } else if (nn(t)) t.set(e, n)
      else if (an(t)) t.add(e)
      else {
        if (!Je(t)) return c(!1)
        'number' != typeof e && (e = parseInt(e, 10)),
          d(e >= 0, "Not a valid index: '" + e + "'"),
          zt(),
          e >= t.length && (t.length = e + 1),
          (t[e] = n),
          Ut()
      }
    else {
      zt()
      var o = e
      try {
        for (var i in o) Oe(t, i, o[i])
      } finally {
        Ut()
      }
    }
  }
  function De(t, e) {
    return hn(t)
      ? vn(t).has(e)
      : nn(t) || an(t)
      ? t.has(e)
      : Je(t)
      ? e >= 0 && e < t.length
      : c(!1)
  }
  function Ne(t, e, n, r) {
    return 'function' == typeof n
      ? (function (t, e, n, r) {
          return vn(t, e).observe(n, r)
        })(t, e, n, r)
      : (function (t, e, n) {
          return vn(t).observe(e, n)
        })(t, e, n)
  }
  _e.prototype = Object.create(Error.prototype)
  var Pe = { detectCycles: !0, exportMapsAsObjects: !0, recurseEverything: !1 }
  function Ce(t, e, n, r) {
    return r.detectCycles && t.set(e, n), n
  }
  function Ie(t, e, n) {
    if (!e.recurseEverything && !Te(t)) return t
    if ('object' != typeof t) return t
    if (null === t) return null
    if (t instanceof Date) return t
    if (wt(t)) return Ie(t.get(), e, n)
    if ((Te(t) && Se(t), !0 === e.detectCycles && null !== t && n.has(t)))
      return n.get(t)
    if (Je(t) || Array.isArray(t)) {
      var r = Ce(n, t, [], e),
        o = t.map(function (t) {
          return Ie(t, e, n)
        })
      r.length = o.length
      for (var i = 0, a = o.length; i < a; i++) r[i] = o[i]
      return r
    }
    if (an(t) || Object.getPrototypeOf(t) === Set.prototype) {
      if (!1 === e.exportMapsAsObjects) {
        var s = Ce(n, t, new Set(), e)
        return (
          t.forEach(function (t) {
            s.add(Ie(t, e, n))
          }),
          s
        )
      }
      var u = Ce(n, t, [], e)
      return (
        t.forEach(function (t) {
          u.push(Ie(t, e, n))
        }),
        u
      )
    }
    if (nn(t) || Object.getPrototypeOf(t) === Map.prototype) {
      if (!1 === e.exportMapsAsObjects) {
        var l = Ce(n, t, new Map(), e)
        return (
          t.forEach(function (t, r) {
            l.set(r, Ie(t, e, n))
          }),
          l
        )
      }
      var c = Ce(n, t, {}, e)
      return (
        t.forEach(function (t, r) {
          c[r] = Ie(t, e, n)
        }),
        c
      )
    }
    var d = Ce(n, t, {}, e)
    return (
      b(t).forEach(function (r) {
        d[r] = Ie(t[r], e, n)
      }),
      d
    )
  }
  function Le(t, e) {
    var n
    return (
      'boolean' == typeof e && (e = { detectCycles: e }),
      e || (e = Pe),
      (e.detectCycles =
        void 0 === e.detectCycles
          ? !0 === e.recurseEverything
          : !0 === e.detectCycles),
      e.detectCycles && (n = new Map()),
      Ie(t, e, n)
    )
  }
  function je() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
    var n = !1
    'boolean' == typeof t[t.length - 1] && (n = t.pop())
    var r = (function (t) {
      switch (t.length) {
        case 0:
          return jt.trackingDerivation
        case 1:
          return fn(t[0])
        case 2:
          return fn(t[0], t[1])
      }
    })(t)
    if (!r) return c(!1)
    r.isTracing, tt.NONE, (r.isTracing = n ? tt.BREAK : tt.LOG)
  }
  function Re(t, e) {
    void 0 === e && (e = void 0), zt()
    try {
      return t.apply(e)
    } finally {
      Ut()
    }
  }
  function ke(t, e, n) {
    var r
    'number' == typeof n.timeout &&
      (r = setTimeout(function () {
        if (!i[T].isDisposed) {
          i()
          var t = new Error('WHEN_TIMEOUT')
          if (!n.onError) throw t
          n.onError(t)
        }
      }, n.timeout)),
      (n.name = n.name || 'When@' + l())
    var o = mt(n.name + '-effect', e),
      i = re(function (e) {
        t() && (e.dispose(), r && clearTimeout(r), o())
      }, n)
    return i
  }
  function Be(t) {
    return t[T]
  }
  function ze(t) {
    return 'string' == typeof t || 'number' == typeof t || 'symbol' == typeof t
  }
  var Ue = {
    has: function (t, e) {
      if (e === T || 'constructor' === e || e === L) return !0
      var n = Be(t)
      return ze(e) ? n.has(e) : e in t
    },
    get: function (t, e) {
      if (e === T || 'constructor' === e || e === L) return t[e]
      var n = Be(t),
        r = n.values.get(e)
      if (r instanceof S) {
        var o = r.get()
        return void 0 === o && n.has(e), o
      }
      return ze(e) && n.has(e), t[e]
    },
    set: function (t, e, n) {
      return !!ze(e) && (Oe(t, e, n), !0)
    },
    deleteProperty: function (t, e) {
      return !!ze(e) && (Be(t).remove(e), !0)
    },
    ownKeys: function (t) {
      return Be(t).keysAtom.reportObserved(), Reflect.ownKeys(t)
    },
    preventExtensions: function (t) {
      return c('Dynamic observable objects cannot be frozen'), !1
    }
  }
  function He(t) {
    return void 0 !== t.interceptors && t.interceptors.length > 0
  }
  function Xe(t, e) {
    var n = t.interceptors || (t.interceptors = [])
    return (
      n.push(e),
      p(function () {
        var t = n.indexOf(e)
        ;-1 !== t && n.splice(t, 1)
      })
    )
  }
  function Ge(t, e) {
    var n = dt()
    try {
      for (
        var r = I(t.interceptors || []), o = 0, i = r.length;
        o < i &&
        (d(
          !(e = r[o](e)) || e.type,
          'Intercept handlers should return nothing or a change object'
        ),
        e);
        o++
      );
      return e
    } finally {
      pt(n)
    }
  }
  function We(t) {
    return void 0 !== t.changeListeners && t.changeListeners.length > 0
  }
  function Ye(t, e) {
    var n = t.changeListeners || (t.changeListeners = [])
    return (
      n.push(e),
      p(function () {
        var t = n.indexOf(e)
        ;-1 !== t && n.splice(t, 1)
      })
    )
  }
  function Fe(t, e) {
    var n = dt(),
      r = t.changeListeners
    if (r) {
      for (var o = 0, i = (r = r.slice()).length; o < i; o++) r[o](e)
      pt(n)
    }
  }
  var Ve = {
    get: function (t, e) {
      return e === T
        ? t[T]
        : 'length' === e
        ? t[T].getArrayLength()
        : 'number' == typeof e
        ? qe.get.call(t, e)
        : 'string' != typeof e || isNaN(e)
        ? qe.hasOwnProperty(e)
          ? qe[e]
          : t[e]
        : qe.get.call(t, parseInt(e))
    },
    set: function (t, e, n) {
      return (
        'length' === e && t[T].setArrayLength(n),
        'number' == typeof e && qe.set.call(t, e, n),
        'symbol' == typeof e || isNaN(e)
          ? (t[e] = n)
          : qe.set.call(t, parseInt(e), n),
        !0
      )
    },
    preventExtensions: function (t) {
      return c('Observable arrays cannot be frozen'), !1
    }
  }
  var Ke = (function () {
      function t(t, e, n) {
        ;(this.owned = n),
          (this.values = []),
          (this.proxy = void 0),
          (this.lastKnownLength = 0),
          (this.atom = new S(t || 'ObservableArray@' + l())),
          (this.enhancer = function (n, r) {
            return e(n, r, t + '[..]')
          })
      }
      return (
        (t.prototype.dehanceValue = function (t) {
          return void 0 !== this.dehancer ? this.dehancer(t) : t
        }),
        (t.prototype.dehanceValues = function (t) {
          return void 0 !== this.dehancer && t.length > 0
            ? t.map(this.dehancer)
            : t
        }),
        (t.prototype.intercept = function (t) {
          return Xe(this, t)
        }),
        (t.prototype.observe = function (t, e) {
          return (
            void 0 === e && (e = !1),
            e &&
              t({
                object: this.proxy,
                type: 'splice',
                index: 0,
                added: this.values.slice(),
                addedCount: this.values.length,
                removed: [],
                removedCount: 0
              }),
            Ye(this, t)
          )
        }),
        (t.prototype.getArrayLength = function () {
          return this.atom.reportObserved(), this.values.length
        }),
        (t.prototype.setArrayLength = function (t) {
          if ('number' != typeof t || t < 0)
            throw new Error('[mobx.array] Out of range: ' + t)
          var e = this.values.length
          if (t !== e)
            if (t > e) {
              for (var n = new Array(t - e), r = 0; r < t - e; r++)
                n[r] = void 0
              this.spliceWithArray(e, 0, n)
            } else this.spliceWithArray(t, e - t)
        }),
        (t.prototype.updateArrayLength = function (t, e) {
          if (t !== this.lastKnownLength)
            throw new Error(
              '[mobx] Modification exception: the internal structure of an observable array was changed.'
            )
          this.lastKnownLength += e
        }),
        (t.prototype.spliceWithArray = function (t, e, n) {
          var r = this
          st(this.atom)
          var o = this.values.length
          if (
            (void 0 === t
              ? (t = 0)
              : t > o
              ? (t = o)
              : t < 0 && (t = Math.max(0, o + t)),
            (e =
              1 === arguments.length
                ? o - t
                : null == e
                ? 0
                : Math.max(0, Math.min(e, o - t))),
            void 0 === n && (n = s),
            He(this))
          ) {
            var i = Ge(this, {
              object: this.proxy,
              type: 'splice',
              index: t,
              removedCount: e,
              added: n
            })
            if (!i) return s
            ;(e = i.removedCount), (n = i.added)
          }
          n =
            0 === n.length
              ? n
              : n.map(function (t) {
                  return r.enhancer(t, void 0)
                })
          var a = this.spliceItemsIntoValues(t, e, n)
          return (
            (0 === e && 0 === n.length) || this.notifyArraySplice(t, n, a),
            this.dehanceValues(a)
          )
        }),
        (t.prototype.spliceItemsIntoValues = function (t, e, n) {
          var r
          if (n.length < 1e4)
            return (r = this.values).splice.apply(r, I([t, e], n))
          var o = this.values.slice(t, t + e)
          return (
            (this.values = this.values
              .slice(0, t)
              .concat(n, this.values.slice(t + e))),
            o
          )
        }),
        (t.prototype.notifyArrayChildUpdate = function (t, e, n) {
          var r = !this.owned && !1,
            o = We(this),
            i =
              o || r
                ? {
                    object: this.proxy,
                    type: 'update',
                    index: t,
                    newValue: e,
                    oldValue: n
                  }
                : null
          this.atom.reportChanged(), o && Fe(this, i)
        }),
        (t.prototype.notifyArraySplice = function (t, e, n) {
          var r = !this.owned && !1,
            o = We(this),
            i =
              o || r
                ? {
                    object: this.proxy,
                    type: 'splice',
                    index: t,
                    removed: n,
                    added: e,
                    removedCount: n.length,
                    addedCount: e.length
                  }
                : null
          this.atom.reportChanged(), o && Fe(this, i)
        }),
        t
      )
    })(),
    qe = {
      intercept: function (t) {
        return this[T].intercept(t)
      },
      observe: function (t, e) {
        return void 0 === e && (e = !1), this[T].observe(t, e)
      },
      clear: function () {
        return this.splice(0)
      },
      replace: function (t) {
        var e = this[T]
        return e.spliceWithArray(0, e.values.length, t)
      },
      toJS: function () {
        return this.slice()
      },
      toJSON: function () {
        return this.toJS()
      },
      splice: function (t, e) {
        for (var n = [], r = 2; r < arguments.length; r++)
          n[r - 2] = arguments[r]
        var o = this[T]
        switch (arguments.length) {
          case 0:
            return []
          case 1:
            return o.spliceWithArray(t)
          case 2:
            return o.spliceWithArray(t, e)
        }
        return o.spliceWithArray(t, e, n)
      },
      spliceWithArray: function (t, e, n) {
        return this[T].spliceWithArray(t, e, n)
      },
      push: function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
        var n = this[T]
        return n.spliceWithArray(n.values.length, 0, t), n.values.length
      },
      pop: function () {
        return this.splice(Math.max(this[T].values.length - 1, 0), 1)[0]
      },
      shift: function () {
        return this.splice(0, 1)[0]
      },
      unshift: function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
        var n = this[T]
        return n.spliceWithArray(0, 0, t), n.values.length
      },
      reverse: function () {
        var t = this.slice()
        return t.reverse.apply(t, arguments)
      },
      sort: function (t) {
        var e = this.slice()
        return e.sort.apply(e, arguments)
      },
      remove: function (t) {
        var e = this[T],
          n = e.dehanceValues(e.values).indexOf(t)
        return n > -1 && (this.splice(n, 1), !0)
      },
      get: function (t) {
        var e = this[T]
        if (e && t < e.values.length)
          return e.atom.reportObserved(), e.dehanceValue(e.values[t])
      },
      set: function (t, e) {
        var n = this[T],
          r = n.values
        if (t < r.length) {
          st(n.atom)
          var o = r[t]
          if (He(n)) {
            var i = Ge(n, {
              type: 'update',
              object: n.proxy,
              index: t,
              newValue: e
            })
            if (!i) return
            e = i.newValue
          }
          ;(e = n.enhancer(e, o)) !== o &&
            ((r[t] = e), n.notifyArrayChildUpdate(t, e, o))
        } else {
          if (t !== r.length)
            throw new Error(
              '[mobx.array] Index out of bounds, ' +
                t +
                ' is larger than ' +
                r.length
            )
          n.spliceWithArray(t, 0, [e])
        }
      }
    }
  ;[
    'concat',
    'flat',
    'includes',
    'indexOf',
    'join',
    'lastIndexOf',
    'slice',
    'toString',
    'toLocaleString'
  ].forEach(function (t) {
    'function' == typeof Array.prototype[t] &&
      (qe[t] = function () {
        var e = this[T]
        e.atom.reportObserved()
        var n = e.dehanceValues(e.values)
        return n[t].apply(n, arguments)
      })
  }),
    [
      'every',
      'filter',
      'find',
      'findIndex',
      'flatMap',
      'forEach',
      'map',
      'some'
    ].forEach(function (t) {
      'function' == typeof Array.prototype[t] &&
        (qe[t] = function (e, n) {
          var r = this,
            o = this[T]
          return (
            o.atom.reportObserved(),
            o.dehanceValues(o.values)[t](function (t, o) {
              return e.call(n, t, o, r)
            }, n)
          )
        })
    }),
    ['reduce', 'reduceRight'].forEach(function (t) {
      qe[t] = function () {
        var e = this,
          n = this[T]
        n.atom.reportObserved()
        var r = arguments[0]
        return (
          (arguments[0] = function (t, o, i) {
            return (o = n.dehanceValue(o)), r(t, o, i, e)
          }),
          n.values[t].apply(n.values, arguments)
        )
      }
    })
  var Ze,
    $e = g('ObservableArrayAdministration', Ke)
  function Je(t) {
    return f(t) && $e(t[T])
  }
  var Qe,
    tn = {},
    en = (function () {
      function t(t, e, n) {
        if (
          (void 0 === e && (e = U),
          void 0 === n && (n = 'ObservableMap@' + l()),
          (this.enhancer = e),
          (this.name = n),
          (this[Ze] = tn),
          (this._keysAtom = A(this.name + '.keys()')),
          (this[Symbol.toStringTag] = 'Map'),
          'function' != typeof Map)
        )
          throw new Error(
            'mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js'
          )
        ;(this._data = new Map()), (this._hasMap = new Map()), this.merge(t)
      }
      return (
        (t.prototype._has = function (t) {
          return this._data.has(t)
        }),
        (t.prototype.has = function (t) {
          var e = this
          if (!jt.trackingDerivation) return this._has(t)
          var n = this._hasMap.get(t)
          if (!n) {
            var r = (n = new St(
              this._has(t),
              H,
              this.name + '.' + x(t) + '?',
              !1
            ))
            this._hasMap.set(t, r),
              ue(r, function () {
                return e._hasMap.delete(t)
              })
          }
          return n.get()
        }),
        (t.prototype.set = function (t, e) {
          var n = this._has(t)
          if (He(this)) {
            var r = Ge(this, {
              type: n ? 'update' : 'add',
              object: this,
              newValue: e,
              name: t
            })
            if (!r) return this
            e = r.newValue
          }
          return n ? this._updateValue(t, e) : this._addValue(t, e), this
        }),
        (t.prototype.delete = function (t) {
          var e = this
          if (
            (st(this._keysAtom), He(this)) &&
            !(r = Ge(this, { type: 'delete', object: this, name: t }))
          )
            return !1
          if (this._has(t)) {
            var n = We(this),
              r = n
                ? {
                    type: 'delete',
                    object: this,
                    oldValue: this._data.get(t).value,
                    name: t
                  }
                : null
            return (
              Re(function () {
                e._keysAtom.reportChanged(),
                  e._updateHasMapEntry(t, !1),
                  e._data.get(t).setNewValue(void 0),
                  e._data.delete(t)
              }),
              n && Fe(this, r),
              !0
            )
          }
          return !1
        }),
        (t.prototype._updateHasMapEntry = function (t, e) {
          var n = this._hasMap.get(t)
          n && n.setNewValue(e)
        }),
        (t.prototype._updateValue = function (t, e) {
          var n = this._data.get(t)
          if ((e = n.prepareNewValue(e)) !== jt.UNCHANGED) {
            var r = !1,
              o = We(this),
              i = o
                ? {
                    type: 'update',
                    object: this,
                    oldValue: n.value,
                    name: t,
                    newValue: e
                  }
                : null
            r, n.setNewValue(e), o && Fe(this, i)
          }
        }),
        (t.prototype._addValue = function (t, e) {
          var n = this
          st(this._keysAtom),
            Re(function () {
              var r = new St(e, n.enhancer, n.name + '.' + x(t), !1)
              n._data.set(t, r),
                (e = r.value),
                n._updateHasMapEntry(t, !0),
                n._keysAtom.reportChanged()
            })
          var r = We(this)
          r &&
            Fe(
              this,
              r ? { type: 'add', object: this, name: t, newValue: e } : null
            )
        }),
        (t.prototype.get = function (t) {
          return this.has(t)
            ? this.dehanceValue(this._data.get(t).get())
            : this.dehanceValue(void 0)
        }),
        (t.prototype.dehanceValue = function (t) {
          return void 0 !== this.dehancer ? this.dehancer(t) : t
        }),
        (t.prototype.keys = function () {
          return this._keysAtom.reportObserved(), this._data.keys()
        }),
        (t.prototype.values = function () {
          var t = this,
            e = this.keys()
          return En({
            next: function () {
              var n = e.next(),
                r = n.done,
                o = n.value
              return { done: r, value: r ? void 0 : t.get(o) }
            }
          })
        }),
        (t.prototype.entries = function () {
          var t = this,
            e = this.keys()
          return En({
            next: function () {
              var n = e.next(),
                r = n.done,
                o = n.value
              return { done: r, value: r ? void 0 : [o, t.get(o)] }
            }
          })
        }),
        (t.prototype[((Ze = T), Symbol.iterator)] = function () {
          return this.entries()
        }),
        (t.prototype.forEach = function (t, e) {
          var n, r
          try {
            for (var o = P(this), i = o.next(); !i.done; i = o.next()) {
              var a = C(i.value, 2),
                s = a[0],
                u = a[1]
              t.call(e, u, s, this)
            }
          } catch (t) {
            n = { error: t }
          } finally {
            try {
              i && !i.done && (r = o.return) && r.call(o)
            } finally {
              if (n) throw n.error
            }
          }
        }),
        (t.prototype.merge = function (t) {
          var e = this
          return (
            nn(t) && (t = t.toJS()),
            Re(function () {
              var n = Mt(!0)
              try {
                v(t)
                  ? b(t).forEach(function (n) {
                      return e.set(n, t[n])
                    })
                  : Array.isArray(t)
                  ? t.forEach(function (t) {
                      var n = C(t, 2),
                        r = n[0],
                        o = n[1]
                      return e.set(r, o)
                    })
                  : _(t)
                  ? (t.constructor !== Map &&
                      c(
                        'Cannot initialize from classes that inherit from Map: ' +
                          t.constructor.name
                      ),
                    t.forEach(function (t, n) {
                      return e.set(n, t)
                    }))
                  : null != t && c('Cannot initialize map from ' + t)
              } finally {
                Tt(n)
              }
            }),
            this
          )
        }),
        (t.prototype.clear = function () {
          var t = this
          Re(function () {
            ct(function () {
              var e, n
              try {
                for (var r = P(t.keys()), o = r.next(); !o.done; o = r.next()) {
                  var i = o.value
                  t.delete(i)
                }
              } catch (t) {
                e = { error: t }
              } finally {
                try {
                  o && !o.done && (n = r.return) && n.call(r)
                } finally {
                  if (e) throw e.error
                }
              }
            })
          })
        }),
        (t.prototype.replace = function (t) {
          var e = this
          return (
            Re(function () {
              var n,
                r,
                o,
                i,
                a = (function (t) {
                  if (_(t) || nn(t)) return t
                  if (Array.isArray(t)) return new Map(t)
                  if (v(t)) {
                    var e = new Map()
                    for (var n in t) e.set(n, t[n])
                    return e
                  }
                  return c("Cannot convert to map from '" + t + "'")
                })(t),
                s = new Map(),
                u = !1
              try {
                for (
                  var l = P(e._data.keys()), d = l.next();
                  !d.done;
                  d = l.next()
                ) {
                  var p = d.value
                  if (!a.has(p))
                    if (e.delete(p)) u = !0
                    else {
                      var h = e._data.get(p)
                      s.set(p, h)
                    }
                }
              } catch (t) {
                n = { error: t }
              } finally {
                try {
                  d && !d.done && (r = l.return) && r.call(l)
                } finally {
                  if (n) throw n.error
                }
              }
              try {
                for (
                  var f = P(a.entries()), y = f.next();
                  !y.done;
                  y = f.next()
                ) {
                  var g = C(y.value, 2),
                    m = ((p = g[0]), (h = g[1]), e._data.has(p))
                  if ((e.set(p, h), e._data.has(p))) {
                    var b = e._data.get(p)
                    s.set(p, b), m || (u = !0)
                  }
                }
              } catch (t) {
                o = { error: t }
              } finally {
                try {
                  y && !y.done && (i = f.return) && i.call(f)
                } finally {
                  if (o) throw o.error
                }
              }
              if (!u)
                if (e._data.size !== s.size) e._keysAtom.reportChanged()
                else
                  for (
                    var x = e._data.keys(),
                      E = s.keys(),
                      M = x.next(),
                      T = E.next();
                    !M.done;

                  ) {
                    if (M.value !== T.value) {
                      e._keysAtom.reportChanged()
                      break
                    }
                    ;(M = x.next()), (T = E.next())
                  }
              e._data = s
            }),
            this
          )
        }),
        Object.defineProperty(t.prototype, 'size', {
          get: function () {
            return this._keysAtom.reportObserved(), this._data.size
          },
          enumerable: !0,
          configurable: !0
        }),
        (t.prototype.toPOJO = function () {
          var t,
            e,
            n = {}
          try {
            for (var r = P(this), o = r.next(); !o.done; o = r.next()) {
              var i = C(o.value, 2),
                a = i[0],
                s = i[1]
              n['symbol' == typeof a ? a : x(a)] = s
            }
          } catch (e) {
            t = { error: e }
          } finally {
            try {
              o && !o.done && (e = r.return) && e.call(r)
            } finally {
              if (t) throw t.error
            }
          }
          return n
        }),
        (t.prototype.toJS = function () {
          return new Map(this)
        }),
        (t.prototype.toJSON = function () {
          return this.toPOJO()
        }),
        (t.prototype.toString = function () {
          var t = this
          return (
            this.name +
            '[{ ' +
            Array.from(this.keys())
              .map(function (e) {
                return x(e) + ': ' + t.get(e)
              })
              .join(', ') +
            ' }]'
          )
        }),
        (t.prototype.observe = function (t, e) {
          return Ye(this, t)
        }),
        (t.prototype.intercept = function (t) {
          return Xe(this, t)
        }),
        t
      )
    })(),
    nn = g('ObservableMap', en),
    rn = {},
    on = (function () {
      function t(t, e, n) {
        if (
          (void 0 === e && (e = U),
          void 0 === n && (n = 'ObservableSet@' + l()),
          (this.name = n),
          (this[Qe] = rn),
          (this._data = new Set()),
          (this._atom = A(this.name)),
          (this[Symbol.toStringTag] = 'Set'),
          'function' != typeof Set)
        )
          throw new Error(
            'mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js'
          )
        ;(this.enhancer = function (t, r) {
          return e(t, r, n)
        }),
          t && this.replace(t)
      }
      return (
        (t.prototype.dehanceValue = function (t) {
          return void 0 !== this.dehancer ? this.dehancer(t) : t
        }),
        (t.prototype.clear = function () {
          var t = this
          Re(function () {
            ct(function () {
              var e, n
              try {
                for (
                  var r = P(t._data.values()), o = r.next();
                  !o.done;
                  o = r.next()
                ) {
                  var i = o.value
                  t.delete(i)
                }
              } catch (t) {
                e = { error: t }
              } finally {
                try {
                  o && !o.done && (n = r.return) && n.call(r)
                } finally {
                  if (e) throw e.error
                }
              }
            })
          })
        }),
        (t.prototype.forEach = function (t, e) {
          var n, r
          try {
            for (var o = P(this), i = o.next(); !i.done; i = o.next()) {
              var a = i.value
              t.call(e, a, a, this)
            }
          } catch (t) {
            n = { error: t }
          } finally {
            try {
              i && !i.done && (r = o.return) && r.call(o)
            } finally {
              if (n) throw n.error
            }
          }
        }),
        Object.defineProperty(t.prototype, 'size', {
          get: function () {
            return this._atom.reportObserved(), this._data.size
          },
          enumerable: !0,
          configurable: !0
        }),
        (t.prototype.add = function (t) {
          var e = this
          if (
            (st(this._atom), He(this)) &&
            !(r = Ge(this, { type: 'add', object: this, newValue: t }))
          )
            return this
          if (!this.has(t)) {
            Re(function () {
              e._data.add(e.enhancer(t, void 0)), e._atom.reportChanged()
            })
            var n = We(this),
              r = n ? { type: 'add', object: this, newValue: t } : null
            n && Fe(this, r)
          }
          return this
        }),
        (t.prototype.delete = function (t) {
          var e = this
          if (
            He(this) &&
            !(r = Ge(this, { type: 'delete', object: this, oldValue: t }))
          )
            return !1
          if (this.has(t)) {
            var n = We(this),
              r = n ? { type: 'delete', object: this, oldValue: t } : null
            return (
              Re(function () {
                e._atom.reportChanged(), e._data.delete(t)
              }),
              n && Fe(this, r),
              !0
            )
          }
          return !1
        }),
        (t.prototype.has = function (t) {
          return (
            this._atom.reportObserved(), this._data.has(this.dehanceValue(t))
          )
        }),
        (t.prototype.entries = function () {
          var t = 0,
            e = Array.from(this.keys()),
            n = Array.from(this.values())
          return En({
            next: function () {
              var r = t
              return (
                (t += 1),
                r < n.length ? { value: [e[r], n[r]], done: !1 } : { done: !0 }
              )
            }
          })
        }),
        (t.prototype.keys = function () {
          return this.values()
        }),
        (t.prototype.values = function () {
          this._atom.reportObserved()
          var t = this,
            e = 0,
            n = Array.from(this._data.values())
          return En({
            next: function () {
              return e < n.length
                ? { value: t.dehanceValue(n[e++]), done: !1 }
                : { done: !0 }
            }
          })
        }),
        (t.prototype.replace = function (t) {
          var e = this
          return (
            an(t) && (t = t.toJS()),
            Re(function () {
              var n = Mt(!0)
              try {
                Array.isArray(t) || m(t)
                  ? (e.clear(),
                    t.forEach(function (t) {
                      return e.add(t)
                    }))
                  : null != t && c('Cannot initialize set from ' + t)
              } finally {
                Tt(n)
              }
            }),
            this
          )
        }),
        (t.prototype.observe = function (t, e) {
          return Ye(this, t)
        }),
        (t.prototype.intercept = function (t) {
          return Xe(this, t)
        }),
        (t.prototype.toJS = function () {
          return new Set(this)
        }),
        (t.prototype.toString = function () {
          return this.name + '[ ' + Array.from(this).join(', ') + ' ]'
        }),
        (t.prototype[((Qe = T), Symbol.iterator)] = function () {
          return this.values()
        }),
        t
      )
    })(),
    an = g('ObservableSet', on),
    sn = (function () {
      function t(t, e, n, r) {
        void 0 === e && (e = new Map()),
          (this.target = t),
          (this.values = e),
          (this.name = n),
          (this.defaultEnhancer = r),
          (this.keysAtom = new S(n + '.keys'))
      }
      return (
        (t.prototype.read = function (t) {
          return this.values.get(t).get()
        }),
        (t.prototype.write = function (t, e) {
          var n = this.target,
            r = this.values.get(t)
          if (r instanceof At) r.set(e)
          else {
            if (He(this)) {
              if (
                !(a = Ge(this, {
                  type: 'update',
                  object: this.proxy || n,
                  name: t,
                  newValue: e
                }))
              )
                return
              e = a.newValue
            }
            if ((e = r.prepareNewValue(e)) !== jt.UNCHANGED) {
              var o = We(this),
                i = !1,
                a = o
                  ? {
                      type: 'update',
                      object: this.proxy || n,
                      oldValue: r.value,
                      name: t,
                      newValue: e
                    }
                  : null
              i, r.setNewValue(e), o && Fe(this, a)
            }
          }
        }),
        (t.prototype.has = function (t) {
          var e = this.pendingKeys || (this.pendingKeys = new Map()),
            n = e.get(t)
          if (n) return n.get()
          var r = !!this.values.get(t)
          return (
            (n = new St(r, H, this.name + '.' + x(t) + '?', !1)),
            e.set(t, n),
            n.get()
          )
        }),
        (t.prototype.addObservableProp = function (t, e, n) {
          void 0 === n && (n = this.defaultEnhancer)
          var r = this.target
          if (He(this)) {
            var o = Ge(this, {
              object: this.proxy || r,
              name: t,
              type: 'add',
              newValue: e
            })
            if (!o) return
            e = o.newValue
          }
          var i = new St(e, n, this.name + '.' + x(t), !1)
          this.values.set(t, i),
            (e = i.value),
            Object.defineProperty(
              r,
              t,
              (function (t) {
                return (
                  ln[t] ||
                  (ln[t] = {
                    configurable: !0,
                    enumerable: !0,
                    get: function () {
                      return this[T].read(t)
                    },
                    set: function (e) {
                      this[T].write(t, e)
                    }
                  })
                )
              })(t)
            ),
            this.notifyPropertyAddition(t, e)
        }),
        (t.prototype.addComputedProp = function (t, e, n) {
          var r = this.target
          ;(n.name = n.name || this.name + '.' + x(e)),
            this.values.set(e, new At(n)),
            (t === r ||
              (function (t, e) {
                var n = Object.getOwnPropertyDescriptor(t, e)
                return !n || (!1 !== n.configurable && !1 !== n.writable)
              })(t, e)) &&
              Object.defineProperty(
                t,
                e,
                (function (t) {
                  return (
                    cn[t] ||
                    (cn[t] = {
                      configurable: jt.computedConfigurable,
                      enumerable: !1,
                      get: function () {
                        return dn(this).read(t)
                      },
                      set: function (e) {
                        dn(this).write(t, e)
                      }
                    })
                  )
                })(e)
              )
        }),
        (t.prototype.remove = function (t) {
          if (this.values.has(t)) {
            var e = this.target
            if (He(this))
              if (
                !(s = Ge(this, {
                  object: this.proxy || e,
                  name: t,
                  type: 'remove'
                }))
              )
                return
            try {
              zt()
              var n = We(this),
                r = !1,
                o = this.values.get(t),
                i = o && o.get()
              if (
                (o && o.set(void 0),
                this.keysAtom.reportChanged(),
                this.values.delete(t),
                this.pendingKeys)
              ) {
                var a = this.pendingKeys.get(t)
                a && a.set(!1)
              }
              delete this.target[t]
              var s = n
                ? {
                    type: 'remove',
                    object: this.proxy || e,
                    oldValue: i,
                    name: t
                  }
                : null
              r, n && Fe(this, s)
            } finally {
              Ut()
            }
          }
        }),
        (t.prototype.illegalAccess = function (t, e) {}),
        (t.prototype.observe = function (t, e) {
          return Ye(this, t)
        }),
        (t.prototype.intercept = function (t) {
          return Xe(this, t)
        }),
        (t.prototype.notifyPropertyAddition = function (t, e) {
          var n = We(this),
            r = n
              ? {
                  type: 'add',
                  object: this.proxy || this.target,
                  name: t,
                  newValue: e
                }
              : null
          if ((n && Fe(this, r), this.pendingKeys)) {
            var o = this.pendingKeys.get(t)
            o && o.set(!0)
          }
          this.keysAtom.reportChanged()
        }),
        (t.prototype.getKeys = function () {
          var t, e
          this.keysAtom.reportObserved()
          var n = []
          try {
            for (var r = P(this.values), o = r.next(); !o.done; o = r.next()) {
              var i = C(o.value, 2),
                a = i[0]
              i[1] instanceof St && n.push(a)
            }
          } catch (e) {
            t = { error: e }
          } finally {
            try {
              o && !o.done && (e = r.return) && e.call(r)
            } finally {
              if (t) throw t.error
            }
          }
          return n
        }),
        t
      )
    })()
  function un(t, e, n) {
    if (
      (void 0 === e && (e = ''),
      void 0 === n && (n = U),
      Object.prototype.hasOwnProperty.call(t, T))
    )
      return t[T]
    v(t) || (e = (t.constructor.name || 'ObservableObject') + '@' + l()),
      e || (e = 'ObservableObject@' + l())
    var r = new sn(t, new Map(), x(e), n)
    return y(t, T, r), r
  }
  var ln = Object.create(null),
    cn = Object.create(null)
  function dn(t) {
    var e = t[T]
    return e || (B(t), t[T])
  }
  var pn = g('ObservableObjectAdministration', sn)
  function hn(t) {
    return !!f(t) && (B(t), pn(t[T]))
  }
  function fn(t, e) {
    if ('object' == typeof t && null !== t) {
      if (Je(t)) return void 0 !== e && c(!1), t[T].atom
      if (an(t)) return t[T]
      if (nn(t)) {
        var n = t
        return void 0 === e
          ? n._keysAtom
          : ((r = n._data.get(e) || n._hasMap.get(e)) || c(!1), r)
      }
      var r
      if ((B(t), e && !t[T] && t[e], hn(t)))
        return e ? ((r = t[T].values.get(e)) || c(!1), r) : c(!1)
      if (w(t) || Ot(t) || qt(t)) return t
    } else if ('function' == typeof t && qt(t[T])) return t[T]
    return c(!1)
  }
  function vn(t, e) {
    return (
      t || c('Expecting some object'),
      void 0 !== e
        ? vn(fn(t, e))
        : w(t) || Ot(t) || qt(t) || nn(t) || an(t)
        ? t
        : (B(t), t[T] ? t[T] : void c(!1))
    )
  }
  function yn(t, e) {
    return (
      void 0 !== e ? fn(t, e) : hn(t) || nn(t) || an(t) ? vn(t) : fn(t)
    ).name
  }
  var gn = Object.prototype.toString
  function _n(t, e, n) {
    return void 0 === n && (n = -1), mn(t, e, n)
  }
  function mn(t, e, n, r, o) {
    if (t === e) return 0 !== t || 1 / t == 1 / e
    if (null == t || null == e) return !1
    if (t != t) return e != e
    var i = typeof t
    if ('function' !== i && 'object' !== i && 'object' != typeof e) return !1
    var a = gn.call(t)
    if (a !== gn.call(e)) return !1
    switch (a) {
      case '[object RegExp]':
      case '[object String]':
        return '' + t == '' + e
      case '[object Number]':
        return +t != +t ? +e != +e : 0 == +t ? 1 / +t == 1 / e : +t == +e
      case '[object Date]':
      case '[object Boolean]':
        return +t == +e
      case '[object Symbol]':
        return (
          'undefined' != typeof Symbol &&
          Symbol.valueOf.call(t) === Symbol.valueOf.call(e)
        )
      case '[object Map]':
      case '[object Set]':
        n >= 0 && n++
    }
    ;(t = bn(t)), (e = bn(e))
    var s = '[object Array]' === a
    if (!s) {
      if ('object' != typeof t || 'object' != typeof e) return !1
      var u = t.constructor,
        l = e.constructor
      if (
        u !== l &&
        !(
          'function' == typeof u &&
          u instanceof u &&
          'function' == typeof l &&
          l instanceof l
        ) &&
        'constructor' in t &&
        'constructor' in e
      )
        return !1
    }
    if (0 === n) return !1
    n < 0 && (n = -1), (o = o || [])
    for (var c = (r = r || []).length; c--; ) if (r[c] === t) return o[c] === e
    if ((r.push(t), o.push(e), s)) {
      if ((c = t.length) !== e.length) return !1
      for (; c--; ) if (!mn(t[c], e[c], n - 1, r, o)) return !1
    } else {
      var d = Object.keys(t),
        p = void 0
      if (((c = d.length), Object.keys(e).length !== c)) return !1
      for (; c--; )
        if (!xn(e, (p = d[c])) || !mn(t[p], e[p], n - 1, r, o)) return !1
    }
    return r.pop(), o.pop(), !0
  }
  function bn(t) {
    return Je(t)
      ? t.slice()
      : _(t) || nn(t) || m(t) || an(t)
      ? Array.from(t.entries())
      : t
  }
  function xn(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }
  function En(t) {
    return (t[Symbol.iterator] = Mn), t
  }
  function Mn() {
    return this
  }
  if ('undefined' == typeof Proxy || 'undefined' == typeof Symbol)
    throw new Error(
      "[mobx] MobX 5+ requires Proxy and Symbol objects. If your environment doesn't support Symbol or Proxy objects, please downgrade to MobX 4. For React Native Android, consider upgrading JSCore."
    )
  'object' == typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ &&
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
      spy: $t,
      extras: { getDebugName: yn },
      $mobx: T
    })
  var Tn = Object.freeze({
      __proto__: null,
      $mobx: T,
      FlowCancellationError: _e,
      get IDerivationState() {
        return Q
      },
      ObservableMap: en,
      ObservableSet: on,
      Reaction: Wt,
      _allowStateChanges: function (t, e) {
        var n,
          r = Mt(t)
        try {
          n = e()
        } finally {
          Tt(r)
        }
        return n
      },
      _allowStateChangesInsideComputed: function (t) {
        var e,
          n = jt.computationDepth
        jt.computationDepth = 0
        try {
          e = t()
        } finally {
          jt.computationDepth = n
        }
        return e
      },
      _allowStateReadsEnd: ft,
      _allowStateReadsStart: ht,
      _endAction: Et,
      _getAdministration: vn,
      _getGlobalState: function () {
        return jt
      },
      _interceptReads: function (t, e, n) {
        var r
        if (nn(t) || Je(t) || wt(t)) r = vn(t)
        else {
          if (!hn(t)) return c(!1)
          if ('string' != typeof e) return c(!1)
          r = vn(t, e)
        }
        return void 0 !== r.dehancer
          ? c(!1)
          : ((r.dehancer = 'function' == typeof e ? e : n),
            function () {
              r.dehancer = void 0
            })
      },
      _isComputingDerivation: function () {
        return null !== jt.trackingDerivation
      },
      _resetGlobalState: function () {
        var t = new Nt()
        for (var e in t) -1 === Dt.indexOf(e) && (jt[e] = t[e])
        jt.allowStateChanges = !jt.enforceActions
      },
      _startAction: xt,
      action: te,
      autorun: re,
      comparer: O,
      computed: rt,
      configure: ce,
      createAtom: A,
      decorate: function (t, e) {
        var n = 'function' == typeof t ? t.prototype : t,
          r = function (t) {
            var r = e[t]
            Array.isArray(r) || (r = [r])
            var o = Object.getOwnPropertyDescriptor(n, t),
              i = r.reduce(function (e, r) {
                return r(n, t, e)
              }, o)
            i && Object.defineProperty(n, t, i)
          }
        for (var o in e) r(o)
        return t
      },
      entries: Ae,
      extendObservable: de,
      flow: function (t) {
        1 !== arguments.length &&
          c('Flow expects 1 argument and cannot be used as decorator')
        var e = t.name || '<unnamed flow>'
        return function () {
          var n,
            r = arguments,
            o = ++ge,
            i = te(e + ' - runid: ' + o + ' - init', t).apply(this, r),
            a = void 0,
            s = new Promise(function (t, r) {
              var s = 0
              function u(t) {
                var n
                a = void 0
                try {
                  n = te(e + ' - runid: ' + o + ' - yield ' + s++, i.next).call(
                    i,
                    t
                  )
                } catch (t) {
                  return r(t)
                }
                c(n)
              }
              function l(t) {
                var n
                a = void 0
                try {
                  n = te(
                    e + ' - runid: ' + o + ' - yield ' + s++,
                    i.throw
                  ).call(i, t)
                } catch (t) {
                  return r(t)
                }
                c(n)
              }
              function c(e) {
                if (!e || 'function' != typeof e.then)
                  return e.done
                    ? t(e.value)
                    : (a = Promise.resolve(e.value)).then(u, l)
                e.then(c, r)
              }
              ;(n = r), u(void 0)
            })
          return (
            (s.cancel = te(e + ' - runid: ' + o + ' - cancel', function () {
              try {
                a && me(a)
                var t = i.return(void 0),
                  e = Promise.resolve(t.value)
                e.then(h, h), me(e), n(new _e())
              } catch (t) {
                n(t)
              }
            })),
            s
          )
        }
      },
      get: function (t, e) {
        if (De(t, e))
          return hn(t) ? t[e] : nn(t) ? t.get(e) : Je(t) ? t[e] : c(!1)
      },
      getAtom: fn,
      getDebugName: yn,
      getDependencyTree: fe,
      getObserverTree: function (t, e) {
        return ye(fn(t, e))
      },
      has: De,
      intercept: function (t, e, n) {
        return 'function' == typeof n
          ? (function (t, e, n) {
              return vn(t, e).intercept(n)
            })(t, e, n)
          : (function (t, e) {
              return vn(t).intercept(e)
            })(t, e)
      },
      isAction: function (t) {
        return 'function' == typeof t && !0 === t.isMobxAction
      },
      isArrayLike: function (t) {
        return Array.isArray(t) || Je(t)
      },
      isBoxedObservable: wt,
      isComputed: xe,
      isComputedProp: Ee,
      isFlowCancellationError: function (t) {
        return t instanceof _e
      },
      isObservable: Te,
      isObservableArray: Je,
      isObservableMap: nn,
      isObservableObject: hn,
      isObservableProp: function (t, e) {
        return 'string' != typeof e ? c(!1) : Me(t, e)
      },
      isObservableSet: an,
      keys: Se,
      observable: $,
      observe: Ne,
      onBecomeObserved: se,
      onBecomeUnobserved: ue,
      onReactionError: function (t) {
        return (
          jt.globalReactionErrorHandlers.push(t),
          function () {
            var e = jt.globalReactionErrorHandlers.indexOf(t)
            e >= 0 && jt.globalReactionErrorHandlers.splice(e, 1)
          }
        )
      },
      reaction: ae,
      remove: function (t, e) {
        if (hn(t)) t[T].remove(e)
        else if (nn(t)) t.delete(e)
        else if (an(t)) t.delete(e)
        else {
          if (!Je(t)) return c(!1)
          'number' != typeof e && (e = parseInt(e, 10)),
            d(e >= 0, "Not a valid index: '" + e + "'"),
            t.splice(e, 1)
        }
      },
      runInAction: ee,
      set: Oe,
      spy: $t,
      toJS: Le,
      trace: je,
      transaction: Re,
      untracked: ct,
      values: we,
      when: function (t, e, n) {
        return 1 === arguments.length || (e && 'object' == typeof e)
          ? (function (t, e) {
              var n,
                r = new Promise(function (r, o) {
                  var i = ke(t, r, N(N({}, e), { onError: o }))
                  n = function () {
                    i(), o('WHEN_CANCELLED')
                  }
                })
              return (r.cancel = n), r
            })(t, e)
          : ke(t, e, n || {})
      }
    }),
    Sn = n(Tn)
  !(function (t, n) {
    !(function (t, n, r) {
      function o(t) {
        return !(
          (t.prototype && t.prototype.render) ||
          n.Component.isPrototypeOf(t)
        )
      }
      function i(t) {
        var e =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = e.prefix,
          r = void 0 === n ? '' : n,
          o = e.suffix,
          i = void 0 === o ? '' : o
        return (
          r +
          (t.displayName ||
            t.name ||
            (t.constructor && t.constructor.name) ||
            '<component>') +
          i
        )
      }
      var a =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (t) {
                return typeof t
              }
            : function (t) {
                return t &&
                  'function' == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? 'symbol'
                  : typeof t
              },
        s = function (t, e) {
          if (!(t instanceof e))
            throw new TypeError('Cannot call a class as a function')
        },
        u = (function () {
          function t(t, e) {
            for (var n = 0; n < e.length; n++) {
              var r = e[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
            }
          }
          return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e
          }
        })(),
        l = function (t, e) {
          if ('function' != typeof e && null !== e)
            throw new TypeError(
              'Super expression must either be null or a function, not ' +
                typeof e
            )
          ;(t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          })),
            e &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(t, e)
                : (t.__proto__ = e))
        },
        c = function (t, e) {
          if (!t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            )
          return !e || ('object' != typeof e && 'function' != typeof e) ? t : e
        },
        d = !1,
        p = console
      function h(t) {
        d = t
      }
      function f(t) {
        var e = r._getGlobalState().allowStateChanges
        return (r._getGlobalState().allowStateChanges = t), e
      }
      function v(t) {
        r._getGlobalState().allowStateChanges = t
      }
      function y(t, e, n, r, o) {
        var i = f(t),
          a = void 0
        try {
          a = e(n, r, o)
        } finally {
          v(i)
        }
        return a
      }
      function g(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
          r = t[e],
          o = m[e],
          i = r
            ? !0 === n
              ? function () {
                  o.apply(this, arguments), r.apply(this, arguments)
                }
              : function () {
                  r.apply(this, arguments), o.apply(this, arguments)
                }
            : o
        t[e] = i
      }
      function _(t, e) {
        if (
          null == t ||
          null == e ||
          'object' !== (void 0 === t ? 'undefined' : a(t)) ||
          'object' !== (void 0 === e ? 'undefined' : a(e))
        )
          return t !== e
        var n = Object.keys(t)
        if (n.length !== Object.keys(e).length) return !0
        for (var r = void 0, o = n.length - 1; (r = n[o]); o--)
          if (e[r] !== t[r]) return !0
        return !1
      }
      var m = {
        componentWillMount: function () {
          var t = this
          if (!0 !== d) {
            var e = i(this),
              o = !1,
              a = !1
            h.call(this, 'props'), h.call(this, 'state')
            var s = this.render.bind(this),
              u = null,
              l = !1,
              c = function () {
                return (
                  ((u = new r.Reaction(e + '.render()', function () {
                    if (
                      !l &&
                      ((l = !0),
                      'function' == typeof t.componentWillReact &&
                        t.componentWillReact(),
                      !0 !== t.__$mobxIsUnmounted)
                    ) {
                      var e = !0
                      try {
                        ;(a = !0),
                          o || n.Component.prototype.forceUpdate.call(t),
                          (e = !1)
                      } finally {
                        ;(a = !1), e && u.dispose()
                      }
                    }
                  })).reactComponent = t),
                  (p.$mobx = u),
                  (t.render = p),
                  p(t.props, t.state, t.context)
                )
              },
              p = function (t, e, n) {
                l = !1
                var r = void 0,
                  o = void 0
                if (
                  (u.track(function () {
                    try {
                      o = y(!1, s, t, e, n)
                    } catch (t) {
                      r = t
                    }
                  }),
                  r)
                )
                  throw r
                return o
              }
            this.render = c
          }
          function h(t) {
            var e = this[t],
              n = r.createAtom('reactive ' + t)
            Object.defineProperty(this, t, {
              configurable: !0,
              enumerable: !0,
              get: function () {
                return n.reportObserved(), e
              },
              set: function (t) {
                !a && _(e, t)
                  ? ((e = t), (o = !0), n.reportChanged(), (o = !1))
                  : (e = t)
              }
            })
          }
        },
        componentWillUnmount: function () {
          !0 !== d &&
            (this.render.$mobx && this.render.$mobx.dispose(),
            (this.__$mobxIsUnmounted = !0))
        },
        componentDidMount: function () {},
        componentDidUpdate: function () {},
        shouldComponentUpdate: function (t, e) {
          return (
            d &&
              p.warn(
                '[mobx-preact] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.'
              ),
            this.state !== e || _(this.props, t)
          )
        }
      }
      function b(t) {
        var e, r
        if (
          (arguments.length > 1 &&
            p.warn(
              'Mobx observer: Using observer to inject stores is not supported. Use `@connect(["store1", "store2"]) ComponentClass instead or preferably, use `@inject("store1", "store2") @observer ComponentClass` or `inject("store1", "store2")(observer(componentClass))``'
            ),
          !0 === t.isMobxInjector &&
            p.warn(
              "Mobx observer: You are trying to use 'observer' on a component that already has 'inject'. Please apply 'observer' before applying 'inject'"
            ),
          o(t))
        )
          return b(
            ((r = e =
              (function (e) {
                function n() {
                  return (
                    s(this, n),
                    c(
                      this,
                      (n.__proto__ || Object.getPrototypeOf(n)).apply(
                        this,
                        arguments
                      )
                    )
                  )
                }
                return (
                  l(n, e),
                  u(n, [
                    {
                      key: 'render',
                      value: function () {
                        return t.call(this, this.props, this.context)
                      }
                    }
                  ]),
                  n
                )
              })(n.Component)),
            (e.displayName = i(t)),
            r)
          )
        if (!t) throw new Error("Please pass a valid component to 'observer'")
        return x(t.prototype || t), (t.isMobXReactObserver = !0), t
      }
      function x(t) {
        g(t, 'componentWillMount', !0),
          g(t, 'componentDidMount'),
          t.shouldComponentUpdate ||
            (t.shouldComponentUpdate = m.shouldComponentUpdate)
      }
      var E = b(function (t) {
        return t.children[0]()
      })
      function M(t, e) {
        return t((e = { exports: {} }), e.exports), e.exports
      }
      ;(E.displayName = 'Observer'),
        'undefined' != typeof window
          ? window
          : void 0 !== e || ('undefined' != typeof self && self)
      var T = M(function (t, e) {
          !(function (e, n) {
            t.exports = n()
          })(0, function () {
            var t = {
                childContextTypes: !0,
                contextTypes: !0,
                defaultProps: !0,
                displayName: !0,
                getDefaultProps: !0,
                getDerivedStateFromProps: !0,
                mixins: !0,
                propTypes: !0,
                type: !0
              },
              e = {
                name: !0,
                length: !0,
                prototype: !0,
                caller: !0,
                callee: !0,
                arguments: !0,
                arity: !0
              },
              n = Object.defineProperty,
              r = Object.getOwnPropertyNames,
              o = Object.getOwnPropertySymbols,
              i = Object.getOwnPropertyDescriptor,
              a = Object.getPrototypeOf,
              s = a && a(Object)
            return function u(l, c, d) {
              if ('string' != typeof c) {
                if (s) {
                  var p = a(c)
                  p && p !== s && u(l, p, d)
                }
                var h = r(c)
                o && (h = h.concat(o(c)))
                for (var f = 0; f < h.length; ++f) {
                  var v = h[f]
                  if (!(t[v] || e[v] || (d && d[v]))) {
                    var y = i(c, v)
                    try {
                      n(l, v, y)
                    } catch (t) {}
                  }
                }
                return l
              }
              return l
            }
          })
        }),
        S = {
          isMobxInjector: {
            value: !0,
            writable: !0,
            configurable: !0,
            enumerable: !0
          }
        }
      function w(t, e, r) {
        var o,
          a,
          d = i(e, { prefix: 'inject-', suffix: r ? '-with-' + r : '' }),
          p =
            ((a = o =
              (function (r) {
                function o() {
                  return (
                    s(this, o),
                    c(
                      this,
                      (o.__proto__ || Object.getPrototypeOf(o)).apply(
                        this,
                        arguments
                      )
                    )
                  )
                }
                return (
                  l(o, r),
                  u(o, [
                    {
                      key: 'render',
                      value: function () {
                        var r = {}
                        for (var o in this.props)
                          this.props.hasOwnProperty(o) && (r[o] = this.props[o])
                        var i =
                          t(this.context.mobxStores || {}, r, this.context) ||
                          {}
                        for (var a in i) r[a] = i[a]
                        return n.h(e, r)
                      }
                    }
                  ]),
                  o
                )
              })(n.Component)),
            (o.displayName = d),
            a)
        return (
          T(p, e), (p.wrappedComponent = e), Object.defineProperties(p, S), p
        )
      }
      function A(t) {
        return function (e, n) {
          return (
            t.forEach(function (t) {
              if (!(t in n)) {
                if (!(t in e))
                  throw new Error(
                    "MobX injector: Store '" +
                      t +
                      "' is not available! Make sure it is provided by some Provider"
                  )
                n[t] = e[t]
              }
            }),
            n
          )
        }
      }
      function O() {
        var t = void 0
        if ('function' == typeof arguments[0])
          return (
            (t = arguments[0]),
            function (e) {
              var n = w(t, e)
              return (
                (n.isMobxInjector = !1), ((n = b(n)).isMobxInjector = !0), n
              )
            }
          )
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n]
        return (
          (t = A(e)),
          function (n) {
            return w(t, n, e.join('-'))
          }
        )
      }
      function D(t, e) {
        if ('string' == typeof t)
          throw new Error('Store names should be provided as array')
        return Array.isArray(t)
          ? e
            ? O.apply(null, t)(D(e))
            : function (e) {
                return D(t, e)
              }
          : b(t)
      }
      var N = { children: !0, key: !0, ref: !0 },
        P = console,
        C = (function (t) {
          function e() {
            return (
              s(this, e),
              c(
                this,
                (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments)
              )
            )
          }
          return (
            l(e, t),
            u(e, [
              {
                key: 'render',
                value: function (t) {
                  var e = t.children
                  return e.length > 1 ? n.h('div', null, ' ', e, ' ') : e[0]
                }
              },
              {
                key: 'getChildContext',
                value: function () {
                  var t = {},
                    e = this.context.mobxStores
                  if (e) for (var n in e) t[n] = e[n]
                  for (var r in this.props)
                    N[r] ||
                      'suppressChangedStoreWarning' === r ||
                      (t[r] = this.props[r])
                  return { mobxStores: t }
                }
              },
              {
                key: 'componentWillReceiveProps',
                value: function (t) {
                  if (
                    (Object.keys(t).length !== Object.keys(this.props).length &&
                      P.warn(
                        'MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children'
                      ),
                    !t.suppressChangedStoreWarning)
                  )
                    for (var e in t)
                      N[e] ||
                        this.props[e] === t[e] ||
                        P.warn(
                          "MobX Provider: Provided store '" +
                            e +
                            "' has changed. Please avoid replacing stores as the change might not propagate to all children"
                        )
                }
              }
            ]),
            e
          )
        })(n.Component)
      if (!n.Component)
        throw new Error('mobx-preact requires Preact to be available')
      ;(t.observer = b),
        (t.Observer = E),
        (t.useStaticRendering = h),
        (t.connect = D),
        (t.inject = O),
        (t.Provider = C),
        Object.defineProperty(t, '__esModule', { value: !0 })
    })(
      n,
      (function () {
        if (r) return i
        r = 1
        var t,
          e,
          n,
          o,
          a,
          s,
          u,
          l,
          c,
          d,
          p,
          h,
          f = {},
          v = [],
          y =
            /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
          g = Array.isArray
        function _(t, e) {
          for (var n in e) t[n] = e[n]
          return t
        }
        function m(t) {
          var e = t.parentNode
          e && e.removeChild(t)
        }
        function b(e, n, r) {
          var o,
            i,
            a,
            s = {}
          for (a in n)
            'key' == a ? (o = n[a]) : 'ref' == a ? (i = n[a]) : (s[a] = n[a])
          if (
            (arguments.length > 2 &&
              (s.children = arguments.length > 3 ? t.call(arguments, 2) : r),
            'function' == typeof e && null != e.defaultProps)
          )
            for (a in e.defaultProps)
              void 0 === s[a] && (s[a] = e.defaultProps[a])
          return x(e, s, o, i, null)
        }
        function x(t, r, o, i, a) {
          var s = {
            type: t,
            props: r,
            key: o,
            ref: i,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            constructor: void 0,
            __v: null == a ? ++n : a,
            __i: -1,
            __u: 0
          }
          return null == a && null != e.vnode && e.vnode(s), s
        }
        function E(t) {
          return t.children
        }
        function M(t, e) {
          ;(this.props = t), (this.context = e)
        }
        function T(t, e) {
          if (null == e) return t.__ ? T(t.__, t.__i + 1) : null
          for (var n; e < t.__k.length; e++)
            if (null != (n = t.__k[e]) && null != n.__e) return n.__e
          return 'function' == typeof t.type ? T(t) : null
        }
        function S(t) {
          var e, n
          if (null != (t = t.__) && null != t.__c) {
            for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
              if (null != (n = t.__k[e]) && null != n.__e) {
                t.__e = t.__c.base = n.__e
                break
              }
            return S(t)
          }
        }
        function w(t) {
          ;((!t.__d && (t.__d = !0) && a.push(t) && !A.__r++) ||
            s !== e.debounceRendering) &&
            ((s = e.debounceRendering) || u)(A)
        }
        function A() {
          var t, n, r, o, i, s, u, c
          for (a.sort(l); (t = a.shift()); )
            t.__d &&
              ((n = a.length),
              (o = void 0),
              (s = (i = (r = t).__v).__e),
              (u = []),
              (c = []),
              r.__P &&
                (((o = _({}, i)).__v = i.__v + 1),
                e.vnode && e.vnode(o),
                j(
                  r.__P,
                  o,
                  i,
                  r.__n,
                  r.__P.namespaceURI,
                  32 & i.__u ? [s] : null,
                  u,
                  null == s ? T(i) : s,
                  !!(32 & i.__u),
                  c
                ),
                (o.__v = i.__v),
                (o.__.__k[o.__i] = o),
                R(u, o, c),
                o.__e != s && S(o)),
              a.length > n && a.sort(l))
          A.__r = 0
        }
        function O(t, e, n, r, o, i, a, s, u, l, c) {
          var d,
            p,
            h,
            y,
            g,
            _ = (r && r.__k) || v,
            m = e.length
          for (n.__d = u, D(n, e, _), u = n.__d, d = 0; d < m; d++)
            null != (h = n.__k[d]) &&
              'boolean' != typeof h &&
              'function' != typeof h &&
              ((p = -1 === h.__i ? f : _[h.__i] || f),
              (h.__i = d),
              j(t, h, p, o, i, a, s, u, l, c),
              (y = h.__e),
              h.ref &&
                p.ref != h.ref &&
                (p.ref && B(p.ref, null, h), c.push(h.ref, h.__c || y, h)),
              null == g && null != y && (g = y),
              65536 & h.__u || p.__k === h.__k
                ? (u = N(h, u, t))
                : 'function' == typeof h.type && void 0 !== h.__d
                ? (u = h.__d)
                : y && (u = y.nextSibling),
              (h.__d = void 0),
              (h.__u &= -196609))
          ;(n.__d = u), (n.__e = g)
        }
        function D(t, e, n) {
          var r,
            o,
            i,
            a,
            s,
            u = e.length,
            l = n.length,
            c = l,
            d = 0
          for (t.__k = [], r = 0; r < u; r++)
            (a = r + d),
              null !=
              (o = t.__k[r] =
                null == (o = e[r]) ||
                'boolean' == typeof o ||
                'function' == typeof o
                  ? null
                  : 'string' == typeof o ||
                    'number' == typeof o ||
                    'bigint' == typeof o ||
                    o.constructor == String
                  ? x(null, o, null, null, null)
                  : g(o)
                  ? x(E, { children: o }, null, null, null)
                  : void 0 === o.constructor && o.__b > 0
                  ? x(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v)
                  : o)
                ? ((o.__ = t),
                  (o.__b = t.__b + 1),
                  (s = P(o, n, a, c)),
                  (o.__i = s),
                  (i = null),
                  -1 !== s && (c--, (i = n[s]) && (i.__u |= 131072)),
                  null == i || null === i.__v
                    ? (-1 == s && d--,
                      'function' != typeof o.type && (o.__u |= 65536))
                    : s !== a &&
                      (s == a - 1
                        ? (d = s - a)
                        : s == a + 1
                        ? d++
                        : s > a
                        ? c > u - a
                          ? (d += s - a)
                          : d--
                        : s < a && d++,
                      s !== r + d && (o.__u |= 65536)))
                : (i = n[a]) &&
                  null == i.key &&
                  i.__e &&
                  !(131072 & i.__u) &&
                  (i.__e == t.__d && (t.__d = T(i)),
                  z(i, i, !1),
                  (n[a] = null),
                  c--)
          if (c)
            for (r = 0; r < l; r++)
              null != (i = n[r]) &&
                !(131072 & i.__u) &&
                (i.__e == t.__d && (t.__d = T(i)), z(i, i))
        }
        function N(t, e, n) {
          var r, o
          if ('function' == typeof t.type) {
            for (r = t.__k, o = 0; r && o < r.length; o++)
              r[o] && ((r[o].__ = t), (e = N(r[o], e, n)))
            return e
          }
          t.__e != e &&
            (e && t.type && !n.contains(e) && (e = T(t)),
            n.insertBefore(t.__e, e || null),
            (e = t.__e))
          do {
            e = e && e.nextSibling
          } while (null != e && 8 === e.nodeType)
          return e
        }
        function P(t, e, n, r) {
          var o = t.key,
            i = t.type,
            a = n - 1,
            s = n + 1,
            u = e[n]
          if (
            null === u ||
            (u && o == u.key && i === u.type && !(131072 & u.__u))
          )
            return n
          if (r > (null == u || 131072 & u.__u ? 0 : 1))
            for (; a >= 0 || s < e.length; ) {
              if (a >= 0) {
                if (
                  (u = e[a]) &&
                  !(131072 & u.__u) &&
                  o == u.key &&
                  i === u.type
                )
                  return a
                a--
              }
              if (s < e.length) {
                if (
                  (u = e[s]) &&
                  !(131072 & u.__u) &&
                  o == u.key &&
                  i === u.type
                )
                  return s
                s++
              }
            }
          return -1
        }
        function C(t, e, n) {
          '-' === e[0]
            ? t.setProperty(e, null == n ? '' : n)
            : (t[e] =
                null == n
                  ? ''
                  : 'number' != typeof n || y.test(e)
                  ? n
                  : n + 'px')
        }
        function I(t, e, n, r, o) {
          var i
          t: if ('style' === e)
            if ('string' == typeof n) t.style.cssText = n
            else {
              if (('string' == typeof r && (t.style.cssText = r = ''), r))
                for (e in r) (n && e in n) || C(t.style, e, '')
              if (n) for (e in n) (r && n[e] === r[e]) || C(t.style, e, n[e])
            }
          else if ('o' === e[0] && 'n' === e[1])
            (i = e !== (e = e.replace(/(PointerCapture)$|Capture$/i, '$1'))),
              (e =
                e.toLowerCase() in t || 'onFocusOut' === e || 'onFocusIn' === e
                  ? e.toLowerCase().slice(2)
                  : e.slice(2)),
              t.l || (t.l = {}),
              (t.l[e + i] = n),
              n
                ? r
                  ? (n.t = r.t)
                  : ((n.t = c), t.addEventListener(e, i ? p : d, i))
                : t.removeEventListener(e, i ? p : d, i)
          else {
            if ('http://www.w3.org/2000/svg' == o)
              e = e.replace(/xlink(H|:h)/, 'h').replace(/sName$/, 's')
            else if (
              'width' != e &&
              'height' != e &&
              'href' != e &&
              'list' != e &&
              'form' != e &&
              'tabIndex' != e &&
              'download' != e &&
              'rowSpan' != e &&
              'colSpan' != e &&
              'role' != e &&
              'popover' != e &&
              e in t
            )
              try {
                t[e] = null == n ? '' : n
                break t
              } catch (t) {}
            'function' == typeof n ||
              (null == n || (!1 === n && '-' !== e[4])
                ? t.removeAttribute(e)
                : t.setAttribute(e, 'popover' == e && 1 == n ? '' : n))
          }
        }
        function L(t) {
          return function (n) {
            if (this.l) {
              var r = this.l[n.type + t]
              if (null == n.u) n.u = c++
              else if (n.u < r.t) return
              return r(e.event ? e.event(n) : n)
            }
          }
        }
        function j(t, n, r, o, i, a, s, u, l, c) {
          var d,
            p,
            h,
            f,
            v,
            y,
            m,
            b,
            x,
            T,
            S,
            w,
            A,
            D,
            N,
            P,
            C = n.type
          if (void 0 !== n.constructor) return null
          128 & r.__u && ((l = !!(32 & r.__u)), (a = [(u = n.__e = r.__e)])),
            (d = e.__b) && d(n)
          t: if ('function' == typeof C)
            try {
              if (
                ((b = n.props),
                (x = 'prototype' in C && C.prototype.render),
                (T = (d = C.contextType) && o[d.__c]),
                (S = d ? (T ? T.props.value : d.__) : o),
                r.__c
                  ? (m = (p = n.__c = r.__c).__ = p.__E)
                  : (x
                      ? (n.__c = p = new C(b, S))
                      : ((n.__c = p = new M(b, S)),
                        (p.constructor = C),
                        (p.render = U)),
                    T && T.sub(p),
                    (p.props = b),
                    p.state || (p.state = {}),
                    (p.context = S),
                    (p.__n = o),
                    (h = p.__d = !0),
                    (p.__h = []),
                    (p._sb = [])),
                x && null == p.__s && (p.__s = p.state),
                x &&
                  null != C.getDerivedStateFromProps &&
                  (p.__s == p.state && (p.__s = _({}, p.__s)),
                  _(p.__s, C.getDerivedStateFromProps(b, p.__s))),
                (f = p.props),
                (v = p.state),
                (p.__v = n),
                h)
              )
                x &&
                  null == C.getDerivedStateFromProps &&
                  null != p.componentWillMount &&
                  p.componentWillMount(),
                  x &&
                    null != p.componentDidMount &&
                    p.__h.push(p.componentDidMount)
              else {
                if (
                  (x &&
                    null == C.getDerivedStateFromProps &&
                    b !== f &&
                    null != p.componentWillReceiveProps &&
                    p.componentWillReceiveProps(b, S),
                  !p.__e &&
                    ((null != p.shouldComponentUpdate &&
                      !1 === p.shouldComponentUpdate(b, p.__s, S)) ||
                      n.__v === r.__v))
                ) {
                  for (
                    n.__v !== r.__v &&
                      ((p.props = b), (p.state = p.__s), (p.__d = !1)),
                      n.__e = r.__e,
                      n.__k = r.__k,
                      n.__k.forEach(function (t) {
                        t && (t.__ = n)
                      }),
                      w = 0;
                    w < p._sb.length;
                    w++
                  )
                    p.__h.push(p._sb[w])
                  ;(p._sb = []), p.__h.length && s.push(p)
                  break t
                }
                null != p.componentWillUpdate &&
                  p.componentWillUpdate(b, p.__s, S),
                  x &&
                    null != p.componentDidUpdate &&
                    p.__h.push(function () {
                      p.componentDidUpdate(f, v, y)
                    })
              }
              if (
                ((p.context = S),
                (p.props = b),
                (p.__P = t),
                (p.__e = !1),
                (A = e.__r),
                (D = 0),
                x)
              ) {
                for (
                  p.state = p.__s,
                    p.__d = !1,
                    A && A(n),
                    d = p.render(p.props, p.state, p.context),
                    N = 0;
                  N < p._sb.length;
                  N++
                )
                  p.__h.push(p._sb[N])
                p._sb = []
              } else
                do {
                  ;(p.__d = !1),
                    A && A(n),
                    (d = p.render(p.props, p.state, p.context)),
                    (p.state = p.__s)
                } while (p.__d && ++D < 25)
              ;(p.state = p.__s),
                null != p.getChildContext &&
                  (o = _(_({}, o), p.getChildContext())),
                x &&
                  !h &&
                  null != p.getSnapshotBeforeUpdate &&
                  (y = p.getSnapshotBeforeUpdate(f, v)),
                O(
                  t,
                  g(
                    (P =
                      null != d && d.type === E && null == d.key
                        ? d.props.children
                        : d)
                  )
                    ? P
                    : [P],
                  n,
                  r,
                  o,
                  i,
                  a,
                  s,
                  u,
                  l,
                  c
                ),
                (p.base = n.__e),
                (n.__u &= -161),
                p.__h.length && s.push(p),
                m && (p.__E = p.__ = null)
            } catch (t) {
              if (((n.__v = null), l || null != a)) {
                for (
                  n.__u |= l ? 160 : 32;
                  u && 8 === u.nodeType && u.nextSibling;

                )
                  u = u.nextSibling
                ;(a[a.indexOf(u)] = null), (n.__e = u)
              } else (n.__e = r.__e), (n.__k = r.__k)
              e.__e(t, n, r)
            }
          else
            null == a && n.__v === r.__v
              ? ((n.__k = r.__k), (n.__e = r.__e))
              : (n.__e = k(r.__e, n, r, o, i, a, s, l, c))
          ;(d = e.diffed) && d(n)
        }
        function R(t, n, r) {
          n.__d = void 0
          for (var o = 0; o < r.length; o++) B(r[o], r[++o], r[++o])
          e.__c && e.__c(n, t),
            t.some(function (n) {
              try {
                ;(t = n.__h),
                  (n.__h = []),
                  t.some(function (t) {
                    t.call(n)
                  })
              } catch (t) {
                e.__e(t, n.__v)
              }
            })
        }
        function k(e, n, r, o, i, a, s, u, l) {
          var c,
            d,
            p,
            h,
            v,
            y,
            _,
            b = r.props,
            x = n.props,
            E = n.type
          if (
            ('svg' === E
              ? (i = 'http://www.w3.org/2000/svg')
              : 'math' === E
              ? (i = 'http://www.w3.org/1998/Math/MathML')
              : i || (i = 'http://www.w3.org/1999/xhtml'),
            null != a)
          )
            for (c = 0; c < a.length; c++)
              if (
                (v = a[c]) &&
                'setAttribute' in v == !!E &&
                (E ? v.localName === E : 3 === v.nodeType)
              ) {
                ;(e = v), (a[c] = null)
                break
              }
          if (null == e) {
            if (null === E) return document.createTextNode(x)
            ;(e = document.createElementNS(i, E, x.is && x)),
              (a = null),
              (u = !1)
          }
          if (null === E) b === x || (u && e.data === x) || (e.data = x)
          else {
            if (
              ((a = a && t.call(e.childNodes)),
              (b = r.props || f),
              !u && null != a)
            )
              for (b = {}, c = 0; c < e.attributes.length; c++)
                b[(v = e.attributes[c]).name] = v.value
            for (c in b)
              if (((v = b[c]), 'children' == c));
              else if ('dangerouslySetInnerHTML' == c) p = v
              else if ('key' !== c && !(c in x)) {
                if (
                  ('value' == c && 'defaultValue' in x) ||
                  ('checked' == c && 'defaultChecked' in x)
                )
                  continue
                I(e, c, null, v, i)
              }
            for (c in x)
              (v = x[c]),
                'children' == c
                  ? (h = v)
                  : 'dangerouslySetInnerHTML' == c
                  ? (d = v)
                  : 'value' == c
                  ? (y = v)
                  : 'checked' == c
                  ? (_ = v)
                  : 'key' === c ||
                    (u && 'function' != typeof v) ||
                    b[c] === v ||
                    I(e, c, v, b[c], i)
            if (d)
              u ||
                (p && (d.__html === p.__html || d.__html === e.innerHTML)) ||
                (e.innerHTML = d.__html),
                (n.__k = [])
            else if (
              (p && (e.innerHTML = ''),
              O(
                e,
                g(h) ? h : [h],
                n,
                r,
                o,
                'foreignObject' === E ? 'http://www.w3.org/1999/xhtml' : i,
                a,
                s,
                a ? a[0] : r.__k && T(r, 0),
                u,
                l
              ),
              null != a)
            )
              for (c = a.length; c--; ) null != a[c] && m(a[c])
            u ||
              ((c = 'value'),
              void 0 !== y &&
                (y !== e[c] ||
                  ('progress' === E && !y) ||
                  ('option' === E && y !== b[c])) &&
                I(e, c, y, b[c], i),
              (c = 'checked'),
              void 0 !== _ && _ !== e[c] && I(e, c, _, b[c], i))
          }
          return e
        }
        function B(t, n, r) {
          try {
            if ('function' == typeof t) {
              var o = 'function' == typeof t.__u
              o && t.__u(), (o && null == n) || (t.__u = t(n))
            } else t.current = n
          } catch (t) {
            e.__e(t, r)
          }
        }
        function z(t, n, r) {
          var o, i
          if (
            (e.unmount && e.unmount(t),
            (o = t.ref) &&
              ((o.current && o.current !== t.__e) || B(o, null, n)),
            null != (o = t.__c))
          ) {
            if (o.componentWillUnmount)
              try {
                o.componentWillUnmount()
              } catch (t) {
                e.__e(t, n)
              }
            o.base = o.__P = null
          }
          if ((o = t.__k))
            for (i = 0; i < o.length; i++)
              o[i] && z(o[i], n, r || 'function' != typeof t.type)
          r || null == t.__e || m(t.__e),
            (t.__c = t.__ = t.__e = t.__d = void 0)
        }
        function U(t, e, n) {
          return this.constructor(t, n)
        }
        function H(n, r, o) {
          var i, a, s, u
          e.__ && e.__(n, r),
            (a = (i = 'function' == typeof o) ? null : (o && o.__k) || r.__k),
            (s = []),
            (u = []),
            j(
              r,
              (n = ((!i && o) || r).__k = b(E, null, [n])),
              a || f,
              f,
              r.namespaceURI,
              !i && o
                ? [o]
                : a
                ? null
                : r.firstChild
                ? t.call(r.childNodes)
                : null,
              s,
              !i && o ? o : a ? a.__e : r.firstChild,
              i,
              u
            ),
            R(s, n, u)
        }
        return (
          (t = v.slice),
          (e = {
            __e: function (t, e, n, r) {
              for (var o, i, a; (e = e.__); )
                if ((o = e.__c) && !o.__)
                  try {
                    if (
                      ((i = o.constructor) &&
                        null != i.getDerivedStateFromError &&
                        (o.setState(i.getDerivedStateFromError(t)),
                        (a = o.__d)),
                      null != o.componentDidCatch &&
                        (o.componentDidCatch(t, r || {}), (a = o.__d)),
                      a)
                    )
                      return (o.__E = o)
                  } catch (e) {
                    t = e
                  }
              throw t
            }
          }),
          (n = 0),
          (o = function (t) {
            return null != t && null == t.constructor
          }),
          (M.prototype.setState = function (t, e) {
            var n
            ;(n =
              null != this.__s && this.__s !== this.state
                ? this.__s
                : (this.__s = _({}, this.state))),
              'function' == typeof t && (t = t(_({}, n), this.props)),
              t && _(n, t),
              null != t && this.__v && (e && this._sb.push(e), w(this))
          }),
          (M.prototype.forceUpdate = function (t) {
            this.__v && ((this.__e = !0), t && this.__h.push(t), w(this))
          }),
          (M.prototype.render = E),
          (a = []),
          (u =
            'function' == typeof Promise
              ? Promise.prototype.then.bind(Promise.resolve())
              : setTimeout),
          (l = function (t, e) {
            return t.__v.__b - e.__v.__b
          }),
          (A.__r = 0),
          (c = 0),
          (d = L(!1)),
          (p = L(!0)),
          (h = 0),
          (i.Component = M),
          (i.Fragment = E),
          (i.cloneElement = function (e, n, r) {
            var o,
              i,
              a,
              s,
              u = _({}, e.props)
            for (a in (e.type &&
              e.type.defaultProps &&
              (s = e.type.defaultProps),
            n))
              'key' == a
                ? (o = n[a])
                : 'ref' == a
                ? (i = n[a])
                : (u[a] = void 0 === n[a] && void 0 !== s ? s[a] : n[a])
            return (
              arguments.length > 2 &&
                (u.children = arguments.length > 3 ? t.call(arguments, 2) : r),
              x(e.type, u, o || e.key, i || e.ref, null)
            )
          }),
          (i.createContext = function (t, e) {
            var n = {
              __c: (e = '__cC' + h++),
              __: t,
              Consumer: function (t, e) {
                return t.children(e)
              },
              Provider: function (t) {
                var n, r
                return (
                  this.getChildContext ||
                    ((n = []),
                    ((r = {})[e] = this),
                    (this.getChildContext = function () {
                      return r
                    }),
                    (this.componentWillUnmount = function () {
                      n = null
                    }),
                    (this.shouldComponentUpdate = function (t) {
                      this.props.value !== t.value &&
                        n.some(function (t) {
                          ;(t.__e = !0), w(t)
                        })
                    }),
                    (this.sub = function (t) {
                      n.push(t)
                      var e = t.componentWillUnmount
                      t.componentWillUnmount = function () {
                        n && n.splice(n.indexOf(t), 1), e && e.call(t)
                      }
                    })),
                  t.children
                )
              }
            }
            return (n.Provider.__ = n.Consumer.contextType = n)
          }),
          (i.createElement = b),
          (i.createRef = function () {
            return { current: null }
          }),
          (i.h = b),
          (i.hydrate = function t(e, n) {
            H(e, n, t)
          }),
          (i.isValidElement = o),
          (i.options = e),
          (i.render = H),
          (i.toChildArray = function t(e, n) {
            return (
              (n = n || []),
              null == e ||
                'boolean' == typeof e ||
                (g(e)
                  ? e.some(function (e) {
                      t(e, n)
                    })
                  : n.push(e)),
              n
            )
          }),
          i
        )
      })(),
      Sn
    )
  })(0, o)
  var wn,
    An,
    On,
    Dn,
    Nn,
    Pn,
    Cn,
    In,
    Ln,
    jn,
    Rn = {},
    kn = [],
    Bn = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
    zn = Array.isArray
  function Un(t, e) {
    for (var n in e) t[n] = e[n]
    return t
  }
  function Hn(t) {
    var e = t.parentNode
    e && e.removeChild(t)
  }
  function Xn(t, e, n) {
    var r,
      o,
      i,
      a = {}
    for (i in e)
      'key' == i ? (r = e[i]) : 'ref' == i ? (o = e[i]) : (a[i] = e[i])
    if (
      (arguments.length > 2 &&
        (a.children = arguments.length > 3 ? wn.call(arguments, 2) : n),
      'function' == typeof t && null != t.defaultProps)
    )
      for (i in t.defaultProps) void 0 === a[i] && (a[i] = t.defaultProps[i])
    return Gn(t, a, r, o, null)
  }
  function Gn(t, e, n, r, o) {
    var i = {
      type: t,
      props: e,
      key: n,
      ref: r,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: void 0,
      __c: null,
      constructor: void 0,
      __v: null == o ? ++On : o,
      __i: -1,
      __u: 0
    }
    return null == o && null != An.vnode && An.vnode(i), i
  }
  function Wn() {
    return { current: null }
  }
  function Yn(t) {
    return t.children
  }
  function Fn(t, e) {
    ;(this.props = t), (this.context = e)
  }
  function Vn(t, e) {
    if (null == e) return t.__ ? Vn(t.__, t.__i + 1) : null
    for (var n; e < t.__k.length; e++)
      if (null != (n = t.__k[e]) && null != n.__e) return n.__e
    return 'function' == typeof t.type ? Vn(t) : null
  }
  function Kn(t) {
    var e, n
    if (null != (t = t.__) && null != t.__c) {
      for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
        if (null != (n = t.__k[e]) && null != n.__e) {
          t.__e = t.__c.base = n.__e
          break
        }
      return Kn(t)
    }
  }
  function qn(t) {
    ;((!t.__d && (t.__d = !0) && Dn.push(t) && !Zn.__r++) ||
      Nn !== An.debounceRendering) &&
      ((Nn = An.debounceRendering) || Pn)(Zn)
  }
  function Zn() {
    var t, e, n, r, o, i, a, s
    for (Dn.sort(Cn); (t = Dn.shift()); )
      t.__d &&
        ((e = Dn.length),
        (r = void 0),
        (i = (o = (n = t).__v).__e),
        (a = []),
        (s = []),
        n.__P &&
          (((r = Un({}, o)).__v = o.__v + 1),
          An.vnode && An.vnode(r),
          ir(
            n.__P,
            r,
            o,
            n.__n,
            n.__P.namespaceURI,
            32 & o.__u ? [i] : null,
            a,
            null == i ? Vn(o) : i,
            !!(32 & o.__u),
            s
          ),
          (r.__v = o.__v),
          (r.__.__k[r.__i] = r),
          ar(a, r, s),
          r.__e != i && Kn(r)),
        Dn.length > e && Dn.sort(Cn))
    Zn.__r = 0
  }
  function $n(t, e, n, r, o, i, a, s, u, l, c) {
    var d,
      p,
      h,
      f,
      v,
      y = (r && r.__k) || kn,
      g = e.length
    for (n.__d = u, Jn(n, e, y), u = n.__d, d = 0; d < g; d++)
      null != (h = n.__k[d]) &&
        'boolean' != typeof h &&
        'function' != typeof h &&
        ((p = -1 === h.__i ? Rn : y[h.__i] || Rn),
        (h.__i = d),
        ir(t, h, p, o, i, a, s, u, l, c),
        (f = h.__e),
        h.ref &&
          p.ref != h.ref &&
          (p.ref && ur(p.ref, null, h), c.push(h.ref, h.__c || f, h)),
        null == v && null != f && (v = f),
        65536 & h.__u || p.__k === h.__k
          ? (u = Qn(h, u, t))
          : 'function' == typeof h.type && void 0 !== h.__d
          ? (u = h.__d)
          : f && (u = f.nextSibling),
        (h.__d = void 0),
        (h.__u &= -196609))
    ;(n.__d = u), (n.__e = v)
  }
  function Jn(t, e, n) {
    var r,
      o,
      i,
      a,
      s,
      u = e.length,
      l = n.length,
      c = l,
      d = 0
    for (t.__k = [], r = 0; r < u; r++)
      (a = r + d),
        null !=
        (o = t.__k[r] =
          null == (o = e[r]) || 'boolean' == typeof o || 'function' == typeof o
            ? null
            : 'string' == typeof o ||
              'number' == typeof o ||
              'bigint' == typeof o ||
              o.constructor == String
            ? Gn(null, o, null, null, null)
            : zn(o)
            ? Gn(Yn, { children: o }, null, null, null)
            : void 0 === o.constructor && o.__b > 0
            ? Gn(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v)
            : o)
          ? ((o.__ = t),
            (o.__b = t.__b + 1),
            (s = er(o, n, a, c)),
            (o.__i = s),
            (i = null),
            -1 !== s && (c--, (i = n[s]) && (i.__u |= 131072)),
            null == i || null === i.__v
              ? (-1 == s && d--,
                'function' != typeof o.type && (o.__u |= 65536))
              : s !== a &&
                (s == a - 1
                  ? (d = s - a)
                  : s == a + 1
                  ? d++
                  : s > a
                  ? c > u - a
                    ? (d += s - a)
                    : d--
                  : s < a && d++,
                s !== r + d && (o.__u |= 65536)))
          : (i = n[a]) &&
            null == i.key &&
            i.__e &&
            !(131072 & i.__u) &&
            (i.__e == t.__d && (t.__d = Vn(i)),
            lr(i, i, !1),
            (n[a] = null),
            c--)
    if (c)
      for (r = 0; r < l; r++)
        null != (i = n[r]) &&
          !(131072 & i.__u) &&
          (i.__e == t.__d && (t.__d = Vn(i)), lr(i, i))
  }
  function Qn(t, e, n) {
    var r, o
    if ('function' == typeof t.type) {
      for (r = t.__k, o = 0; r && o < r.length; o++)
        r[o] && ((r[o].__ = t), (e = Qn(r[o], e, n)))
      return e
    }
    t.__e != e &&
      (e && t.type && !n.contains(e) && (e = Vn(t)),
      n.insertBefore(t.__e, e || null),
      (e = t.__e))
    do {
      e = e && e.nextSibling
    } while (null != e && 8 === e.nodeType)
    return e
  }
  function tr(t, e) {
    return (
      (e = e || []),
      null == t ||
        'boolean' == typeof t ||
        (zn(t)
          ? t.some(function (t) {
              tr(t, e)
            })
          : e.push(t)),
      e
    )
  }
  function er(t, e, n, r) {
    var o = t.key,
      i = t.type,
      a = n - 1,
      s = n + 1,
      u = e[n]
    if (null === u || (u && o == u.key && i === u.type && !(131072 & u.__u)))
      return n
    if (r > (null == u || 131072 & u.__u ? 0 : 1))
      for (; a >= 0 || s < e.length; ) {
        if (a >= 0) {
          if ((u = e[a]) && !(131072 & u.__u) && o == u.key && i === u.type)
            return a
          a--
        }
        if (s < e.length) {
          if ((u = e[s]) && !(131072 & u.__u) && o == u.key && i === u.type)
            return s
          s++
        }
      }
    return -1
  }
  function nr(t, e, n) {
    '-' === e[0]
      ? t.setProperty(e, null == n ? '' : n)
      : (t[e] =
          null == n ? '' : 'number' != typeof n || Bn.test(e) ? n : n + 'px')
  }
  function rr(t, e, n, r, o) {
    var i
    t: if ('style' === e)
      if ('string' == typeof n) t.style.cssText = n
      else {
        if (('string' == typeof r && (t.style.cssText = r = ''), r))
          for (e in r) (n && e in n) || nr(t.style, e, '')
        if (n) for (e in n) (r && n[e] === r[e]) || nr(t.style, e, n[e])
      }
    else if ('o' === e[0] && 'n' === e[1])
      (i = e !== (e = e.replace(/(PointerCapture)$|Capture$/i, '$1'))),
        (e =
          e.toLowerCase() in t || 'onFocusOut' === e || 'onFocusIn' === e
            ? e.toLowerCase().slice(2)
            : e.slice(2)),
        t.l || (t.l = {}),
        (t.l[e + i] = n),
        n
          ? r
            ? (n.u = r.u)
            : ((n.u = In), t.addEventListener(e, i ? jn : Ln, i))
          : t.removeEventListener(e, i ? jn : Ln, i)
    else {
      if ('http://www.w3.org/2000/svg' == o)
        e = e.replace(/xlink(H|:h)/, 'h').replace(/sName$/, 's')
      else if (
        'width' != e &&
        'height' != e &&
        'href' != e &&
        'list' != e &&
        'form' != e &&
        'tabIndex' != e &&
        'download' != e &&
        'rowSpan' != e &&
        'colSpan' != e &&
        'role' != e &&
        'popover' != e &&
        e in t
      )
        try {
          t[e] = null == n ? '' : n
          break t
        } catch (t) {}
      'function' == typeof n ||
        (null == n || (!1 === n && '-' !== e[4])
          ? t.removeAttribute(e)
          : t.setAttribute(e, 'popover' == e && 1 == n ? '' : n))
    }
  }
  function or(t) {
    return function (e) {
      if (this.l) {
        var n = this.l[e.type + t]
        if (null == e.t) e.t = In++
        else if (e.t < n.u) return
        return n(An.event ? An.event(e) : e)
      }
    }
  }
  function ir(t, e, n, r, o, i, a, s, u, l) {
    var c,
      d,
      p,
      h,
      f,
      v,
      y,
      g,
      _,
      m,
      b,
      x,
      E,
      M,
      T,
      S,
      w = e.type
    if (void 0 !== e.constructor) return null
    128 & n.__u && ((u = !!(32 & n.__u)), (i = [(s = e.__e = n.__e)])),
      (c = An.__b) && c(e)
    t: if ('function' == typeof w)
      try {
        if (
          ((g = e.props),
          (_ = 'prototype' in w && w.prototype.render),
          (m = (c = w.contextType) && r[c.__c]),
          (b = c ? (m ? m.props.value : c.__) : r),
          n.__c
            ? (y = (d = e.__c = n.__c).__ = d.__E)
            : (_
                ? (e.__c = d = new w(g, b))
                : ((e.__c = d = new Fn(g, b)),
                  (d.constructor = w),
                  (d.render = cr)),
              m && m.sub(d),
              (d.props = g),
              d.state || (d.state = {}),
              (d.context = b),
              (d.__n = r),
              (p = d.__d = !0),
              (d.__h = []),
              (d._sb = [])),
          _ && null == d.__s && (d.__s = d.state),
          _ &&
            null != w.getDerivedStateFromProps &&
            (d.__s == d.state && (d.__s = Un({}, d.__s)),
            Un(d.__s, w.getDerivedStateFromProps(g, d.__s))),
          (h = d.props),
          (f = d.state),
          (d.__v = e),
          p)
        )
          _ &&
            null == w.getDerivedStateFromProps &&
            null != d.componentWillMount &&
            d.componentWillMount(),
            _ && null != d.componentDidMount && d.__h.push(d.componentDidMount)
        else {
          if (
            (_ &&
              null == w.getDerivedStateFromProps &&
              g !== h &&
              null != d.componentWillReceiveProps &&
              d.componentWillReceiveProps(g, b),
            !d.__e &&
              ((null != d.shouldComponentUpdate &&
                !1 === d.shouldComponentUpdate(g, d.__s, b)) ||
                e.__v === n.__v))
          ) {
            for (
              e.__v !== n.__v &&
                ((d.props = g), (d.state = d.__s), (d.__d = !1)),
                e.__e = n.__e,
                e.__k = n.__k,
                e.__k.forEach(function (t) {
                  t && (t.__ = e)
                }),
                x = 0;
              x < d._sb.length;
              x++
            )
              d.__h.push(d._sb[x])
            ;(d._sb = []), d.__h.length && a.push(d)
            break t
          }
          null != d.componentWillUpdate && d.componentWillUpdate(g, d.__s, b),
            _ &&
              null != d.componentDidUpdate &&
              d.__h.push(function () {
                d.componentDidUpdate(h, f, v)
              })
        }
        if (
          ((d.context = b),
          (d.props = g),
          (d.__P = t),
          (d.__e = !1),
          (E = An.__r),
          (M = 0),
          _)
        ) {
          for (
            d.state = d.__s,
              d.__d = !1,
              E && E(e),
              c = d.render(d.props, d.state, d.context),
              T = 0;
            T < d._sb.length;
            T++
          )
            d.__h.push(d._sb[T])
          d._sb = []
        } else
          do {
            ;(d.__d = !1),
              E && E(e),
              (c = d.render(d.props, d.state, d.context)),
              (d.state = d.__s)
          } while (d.__d && ++M < 25)
        ;(d.state = d.__s),
          null != d.getChildContext && (r = Un(Un({}, r), d.getChildContext())),
          _ &&
            !p &&
            null != d.getSnapshotBeforeUpdate &&
            (v = d.getSnapshotBeforeUpdate(h, f)),
          $n(
            t,
            zn(
              (S =
                null != c && c.type === Yn && null == c.key
                  ? c.props.children
                  : c)
            )
              ? S
              : [S],
            e,
            n,
            r,
            o,
            i,
            a,
            s,
            u,
            l
          ),
          (d.base = e.__e),
          (e.__u &= -161),
          d.__h.length && a.push(d),
          y && (d.__E = d.__ = null)
      } catch (t) {
        if (((e.__v = null), u || null != i)) {
          for (e.__u |= u ? 160 : 32; s && 8 === s.nodeType && s.nextSibling; )
            s = s.nextSibling
          ;(i[i.indexOf(s)] = null), (e.__e = s)
        } else (e.__e = n.__e), (e.__k = n.__k)
        An.__e(t, e, n)
      }
    else
      null == i && e.__v === n.__v
        ? ((e.__k = n.__k), (e.__e = n.__e))
        : (e.__e = sr(n.__e, e, n, r, o, i, a, u, l))
    ;(c = An.diffed) && c(e)
  }
  function ar(t, e, n) {
    e.__d = void 0
    for (var r = 0; r < n.length; r++) ur(n[r], n[++r], n[++r])
    An.__c && An.__c(e, t),
      t.some(function (e) {
        try {
          ;(t = e.__h),
            (e.__h = []),
            t.some(function (t) {
              t.call(e)
            })
        } catch (t) {
          An.__e(t, e.__v)
        }
      })
  }
  function sr(t, e, n, r, o, i, a, s, u) {
    var l,
      c,
      d,
      p,
      h,
      f,
      v,
      y = n.props,
      g = e.props,
      _ = e.type
    if (
      ('svg' === _
        ? (o = 'http://www.w3.org/2000/svg')
        : 'math' === _
        ? (o = 'http://www.w3.org/1998/Math/MathML')
        : o || (o = 'http://www.w3.org/1999/xhtml'),
      null != i)
    )
      for (l = 0; l < i.length; l++)
        if (
          (h = i[l]) &&
          'setAttribute' in h == !!_ &&
          (_ ? h.localName === _ : 3 === h.nodeType)
        ) {
          ;(t = h), (i[l] = null)
          break
        }
    if (null == t) {
      if (null === _) return document.createTextNode(g)
      ;(t = document.createElementNS(o, _, g.is && g)), (i = null), (s = !1)
    }
    if (null === _) y === g || (s && t.data === g) || (t.data = g)
    else {
      if (
        ((i = i && wn.call(t.childNodes)), (y = n.props || Rn), !s && null != i)
      )
        for (y = {}, l = 0; l < t.attributes.length; l++)
          y[(h = t.attributes[l]).name] = h.value
      for (l in y)
        if (((h = y[l]), 'children' == l));
        else if ('dangerouslySetInnerHTML' == l) d = h
        else if ('key' !== l && !(l in g)) {
          if (
            ('value' == l && 'defaultValue' in g) ||
            ('checked' == l && 'defaultChecked' in g)
          )
            continue
          rr(t, l, null, h, o)
        }
      for (l in g)
        (h = g[l]),
          'children' == l
            ? (p = h)
            : 'dangerouslySetInnerHTML' == l
            ? (c = h)
            : 'value' == l
            ? (f = h)
            : 'checked' == l
            ? (v = h)
            : 'key' === l ||
              (s && 'function' != typeof h) ||
              y[l] === h ||
              rr(t, l, h, y[l], o)
      if (c)
        s ||
          (d && (c.__html === d.__html || c.__html === t.innerHTML)) ||
          (t.innerHTML = c.__html),
          (e.__k = [])
      else if (
        (d && (t.innerHTML = ''),
        $n(
          t,
          zn(p) ? p : [p],
          e,
          n,
          r,
          'foreignObject' === _ ? 'http://www.w3.org/1999/xhtml' : o,
          i,
          a,
          i ? i[0] : n.__k && Vn(n, 0),
          s,
          u
        ),
        null != i)
      )
        for (l = i.length; l--; ) null != i[l] && Hn(i[l])
      s ||
        ((l = 'value'),
        void 0 !== f &&
          (f !== t[l] ||
            ('progress' === _ && !f) ||
            ('option' === _ && f !== y[l])) &&
          rr(t, l, f, y[l], o),
        (l = 'checked'),
        void 0 !== v && v !== t[l] && rr(t, l, v, y[l], o))
    }
    return t
  }
  function ur(t, e, n) {
    try {
      if ('function' == typeof t) {
        var r = 'function' == typeof t.__u
        r && t.__u(), (r && null == e) || (t.__u = t(e))
      } else t.current = e
    } catch (t) {
      An.__e(t, n)
    }
  }
  function lr(t, e, n) {
    var r, o
    if (
      (An.unmount && An.unmount(t),
      (r = t.ref) && ((r.current && r.current !== t.__e) || ur(r, null, e)),
      null != (r = t.__c))
    ) {
      if (r.componentWillUnmount)
        try {
          r.componentWillUnmount()
        } catch (t) {
          An.__e(t, e)
        }
      r.base = r.__P = null
    }
    if ((r = t.__k))
      for (o = 0; o < r.length; o++)
        r[o] && lr(r[o], e, n || 'function' != typeof t.type)
    n || null == t.__e || Hn(t.__e), (t.__c = t.__ = t.__e = t.__d = void 0)
  }
  function cr(t, e, n) {
    return this.constructor(t, n)
  }
  function dr(t, e, n) {
    var r, o, i, a
    An.__ && An.__(t, e),
      (o = (r = 'function' == typeof n) ? null : e.__k),
      (i = []),
      (a = []),
      ir(
        e,
        (t = ((!r && n) || e).__k = Xn(Yn, null, [t])),
        o || Rn,
        Rn,
        e.namespaceURI,
        !r && n ? [n] : o ? null : e.firstChild ? wn.call(e.childNodes) : null,
        i,
        !r && n ? n : o ? o.__e : e.firstChild,
        r,
        a
      ),
      ar(i, t, a)
  }
  ;(wn = kn.slice),
    (An = {
      __e: function (t, e, n, r) {
        for (var o, i, a; (e = e.__); )
          if ((o = e.__c) && !o.__)
            try {
              if (
                ((i = o.constructor) &&
                  null != i.getDerivedStateFromError &&
                  (o.setState(i.getDerivedStateFromError(t)), (a = o.__d)),
                null != o.componentDidCatch &&
                  (o.componentDidCatch(t, r || {}), (a = o.__d)),
                a)
              )
                return (o.__E = o)
            } catch (e) {
              t = e
            }
        throw t
      }
    }),
    (On = 0),
    (Fn.prototype.setState = function (t, e) {
      var n
      ;(n =
        null != this.__s && this.__s !== this.state
          ? this.__s
          : (this.__s = Un({}, this.state))),
        'function' == typeof t && (t = t(Un({}, n), this.props)),
        t && Un(n, t),
        null != t && this.__v && (e && this._sb.push(e), qn(this))
    }),
    (Fn.prototype.forceUpdate = function (t) {
      this.__v && ((this.__e = !0), t && this.__h.push(t), qn(this))
    }),
    (Fn.prototype.render = Yn),
    (Dn = []),
    (Pn =
      'function' == typeof Promise
        ? Promise.prototype.then.bind(Promise.resolve())
        : setTimeout),
    (Cn = function (t, e) {
      return t.__v.__b - e.__v.__b
    }),
    (Zn.__r = 0),
    (In = 0),
    (Ln = or(!1)),
    (jn = or(!0))
  var pr,
    hr,
    fr,
    vr = [],
    yr = An,
    gr = yr.__b,
    _r = yr.__r,
    mr = yr.diffed,
    br = yr.__c,
    xr = yr.unmount,
    Er = yr.__
  function Mr() {
    for (var t; (t = vr.shift()); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(wr), t.__H.__h.forEach(Ar), (t.__H.__h = [])
        } catch (e) {
          ;(t.__H.__h = []), yr.__e(e, t.__v)
        }
  }
  ;(yr.__b = function (t) {
    ;(pr = null), gr && gr(t)
  }),
    (yr.__ = function (t, e) {
      t && e.__k && e.__k.__m && (t.__m = e.__k.__m), Er && Er(t, e)
    }),
    (yr.__r = function (t) {
      _r && _r(t)
      var e = (pr = t.__c).__H
      e &&
        (hr === pr
          ? ((e.__h = []),
            (pr.__h = []),
            e.__.forEach(function (t) {
              t.__N && (t.__ = t.__N), (t.i = t.__N = void 0)
            }))
          : (e.__h.forEach(wr), e.__h.forEach(Ar), (e.__h = []))),
        (hr = pr)
    }),
    (yr.diffed = function (t) {
      mr && mr(t)
      var e = t.__c
      e &&
        e.__H &&
        (e.__H.__h.length &&
          ((1 !== vr.push(e) && fr === yr.requestAnimationFrame) ||
            ((fr = yr.requestAnimationFrame) || Sr)(Mr)),
        e.__H.__.forEach(function (t) {
          t.i && (t.__H = t.i), (t.i = void 0)
        })),
        (hr = pr = null)
    }),
    (yr.__c = function (t, e) {
      e.some(function (t) {
        try {
          t.__h.forEach(wr),
            (t.__h = t.__h.filter(function (t) {
              return !t.__ || Ar(t)
            }))
        } catch (n) {
          e.some(function (t) {
            t.__h && (t.__h = [])
          }),
            (e = []),
            yr.__e(n, t.__v)
        }
      }),
        br && br(t, e)
    }),
    (yr.unmount = function (t) {
      xr && xr(t)
      var e,
        n = t.__c
      n &&
        n.__H &&
        (n.__H.__.forEach(function (t) {
          try {
            wr(t)
          } catch (t) {
            e = t
          }
        }),
        (n.__H = void 0),
        e && yr.__e(e, n.__v))
    })
  var Tr = 'function' == typeof requestAnimationFrame
  function Sr(t) {
    var e,
      n = function () {
        clearTimeout(r), Tr && cancelAnimationFrame(e), setTimeout(t)
      },
      r = setTimeout(n, 100)
    Tr && (e = requestAnimationFrame(n))
  }
  function wr(t) {
    var e = pr,
      n = t.__c
    'function' == typeof n && ((t.__c = void 0), n()), (pr = e)
  }
  function Ar(t) {
    var e = pr
    ;(t.__c = t.__()), (pr = e)
  }
  function Or(t, e) {
    for (var n in t) if ('__source' !== n && !(n in e)) return !0
    for (var r in e) if ('__source' !== r && t[r] !== e[r]) return !0
    return !1
  }
  function Dr(t, e) {
    ;(this.props = t), (this.context = e)
  }
  ;((Dr.prototype = new Fn()).isPureReactComponent = !0),
    (Dr.prototype.shouldComponentUpdate = function (t, e) {
      return Or(this.props, t) || Or(this.state, e)
    })
  var Nr = An.__b
  An.__b = function (t) {
    t.type && t.type.__f && t.ref && ((t.props.ref = t.ref), (t.ref = null)),
      Nr && Nr(t)
  }
  var Pr = An.__e
  An.__e = function (t, e, n, r) {
    if (t.then)
      for (var o, i = e; (i = i.__); )
        if ((o = i.__c) && o.__c)
          return (
            null == e.__e && ((e.__e = n.__e), (e.__k = n.__k)), o.__c(t, e)
          )
    Pr(t, e, n, r)
  }
  var Cr = An.unmount
  function Ir(t, e, n) {
    return (
      t &&
        (t.__c &&
          t.__c.__H &&
          (t.__c.__H.__.forEach(function (t) {
            'function' == typeof t.__c && t.__c()
          }),
          (t.__c.__H = null)),
        null !=
          (t = (function (t, e) {
            for (var n in e) t[n] = e[n]
            return t
          })({}, t)).__c &&
          (t.__c.__P === n && (t.__c.__P = e), (t.__c = null)),
        (t.__k =
          t.__k &&
          t.__k.map(function (t) {
            return Ir(t, e, n)
          }))),
      t
    )
  }
  function Lr(t, e, n) {
    return (
      t &&
        n &&
        ((t.__v = null),
        (t.__k =
          t.__k &&
          t.__k.map(function (t) {
            return Lr(t, e, n)
          })),
        t.__c &&
          t.__c.__P === e &&
          (t.__e && n.appendChild(t.__e), (t.__c.__e = !0), (t.__c.__P = n))),
      t
    )
  }
  function jr() {
    ;(this.__u = 0), (this.t = null), (this.__b = null)
  }
  function Rr(t) {
    var e = t.__.__c
    return e && e.__a && e.__a(t)
  }
  function kr() {
    ;(this.u = null), (this.o = null)
  }
  ;(An.unmount = function (t) {
    var e = t.__c
    e && e.__R && e.__R(), e && 32 & t.__u && (t.type = null), Cr && Cr(t)
  }),
    ((jr.prototype = new Fn()).__c = function (t, e) {
      var n = e.__c,
        r = this
      null == r.t && (r.t = []), r.t.push(n)
      var o = Rr(r.__v),
        i = !1,
        a = function () {
          i || ((i = !0), (n.__R = null), o ? o(s) : s())
        }
      n.__R = a
      var s = function () {
        if (!--r.__u) {
          if (r.state.__a) {
            var t = r.state.__a
            r.__v.__k[0] = Lr(t, t.__c.__P, t.__c.__O)
          }
          var e
          for (r.setState({ __a: (r.__b = null) }); (e = r.t.pop()); )
            e.forceUpdate()
        }
      }
      r.__u++ || 32 & e.__u || r.setState({ __a: (r.__b = r.__v.__k[0]) }),
        t.then(a, a)
    }),
    (jr.prototype.componentWillUnmount = function () {
      this.t = []
    }),
    (jr.prototype.render = function (t, e) {
      if (this.__b) {
        if (this.__v.__k) {
          var n = document.createElement('div'),
            r = this.__v.__k[0].__c
          this.__v.__k[0] = Ir(this.__b, n, (r.__O = r.__P))
        }
        this.__b = null
      }
      var o = e.__a && Xn(Yn, null, t.fallback)
      return o && (o.__u &= -33), [Xn(Yn, null, e.__a ? null : t.children), o]
    })
  var Br = function (t, e, n) {
    if (
      (++n[1] === n[0] && t.o.delete(e),
      t.props.revealOrder && ('t' !== t.props.revealOrder[0] || !t.o.size))
    )
      for (n = t.u; n; ) {
        for (; n.length > 3; ) n.pop()()
        if (n[1] < n[0]) break
        t.u = n = n[2]
      }
  }
  ;((kr.prototype = new Fn()).__a = function (t) {
    var e = this,
      n = Rr(e.__v),
      r = e.o.get(t)
    return (
      r[0]++,
      function (o) {
        var i = function () {
          e.props.revealOrder ? (r.push(o), Br(e, t, r)) : o()
        }
        n ? n(i) : i()
      }
    )
  }),
    (kr.prototype.render = function (t) {
      ;(this.u = null), (this.o = new Map())
      var e = tr(t.children)
      t.revealOrder && 'b' === t.revealOrder[0] && e.reverse()
      for (var n = e.length; n--; ) this.o.set(e[n], (this.u = [1, 0, this.u]))
      return t.children
    }),
    (kr.prototype.componentDidUpdate = kr.prototype.componentDidMount =
      function () {
        var t = this
        this.o.forEach(function (e, n) {
          Br(t, n, e)
        })
      })
  var zr =
      ('undefined' != typeof Symbol &&
        Symbol.for &&
        Symbol.for('react.element')) ||
      60103,
    Ur =
      /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
    Hr = /^on(Ani|Tra|Tou|BeforeInp|Compo)/,
    Xr = /[A-Z0-9]/g,
    Gr = 'undefined' != typeof document,
    Wr = function (t) {
      return (
        'undefined' != typeof Symbol && 'symbol' == typeof Symbol()
          ? /fil|che|rad/
          : /fil|che|ra/
      ).test(t)
    }
  function Yr(t, e, n) {
    return (
      null == e.__k && (e.textContent = ''),
      dr(t, e),
      'function' == typeof n && n(),
      t ? t.__c : null
    )
  }
  ;(Fn.prototype.isReactComponent = {}),
    [
      'componentWillMount',
      'componentWillReceiveProps',
      'componentWillUpdate'
    ].forEach(function (t) {
      Object.defineProperty(Fn.prototype, t, {
        configurable: !0,
        get: function () {
          return this['UNSAFE_' + t]
        },
        set: function (e) {
          Object.defineProperty(this, t, {
            configurable: !0,
            writable: !0,
            value: e
          })
        }
      })
    })
  var Fr = An.event
  function Vr() {}
  function Kr() {
    return this.cancelBubble
  }
  function qr() {
    return this.defaultPrevented
  }
  An.event = function (t) {
    return (
      Fr && (t = Fr(t)),
      (t.persist = Vr),
      (t.isPropagationStopped = Kr),
      (t.isDefaultPrevented = qr),
      (t.nativeEvent = t)
    )
  }
  var Zr = {
      enumerable: !1,
      configurable: !0,
      get: function () {
        return this.class
      }
    },
    $r = An.vnode
  An.vnode = function (t) {
    'string' == typeof t.type &&
      (function (t) {
        var e = t.props,
          n = t.type,
          r = {}
        for (var o in e) {
          var i = e[o]
          if (
            !(
              ('value' === o && 'defaultValue' in e && null == i) ||
              (Gr && 'children' === o && 'noscript' === n) ||
              'class' === o ||
              'className' === o
            )
          ) {
            var a = o.toLowerCase()
            'defaultValue' === o && 'value' in e && null == e.value
              ? (o = 'value')
              : 'download' === o && !0 === i
              ? (i = '')
              : 'translate' === a && 'no' === i
              ? (i = !1)
              : 'ondoubleclick' === a
              ? (o = 'ondblclick')
              : 'onchange' !== a ||
                ('input' !== n && 'textarea' !== n) ||
                Wr(e.type)
              ? 'onfocus' === a
                ? (o = 'onfocusin')
                : 'onblur' === a
                ? (o = 'onfocusout')
                : Hr.test(o)
                ? (o = a)
                : -1 === n.indexOf('-') && Ur.test(o)
                ? (o = o.replace(Xr, '-$&').toLowerCase())
                : null === i && (i = void 0)
              : (a = o = 'oninput'),
              'oninput' === a && r[(o = a)] && (o = 'oninputCapture'),
              (r[o] = i)
          }
        }
        'select' == n &&
          r.multiple &&
          Array.isArray(r.value) &&
          (r.value = tr(e.children).forEach(function (t) {
            t.props.selected = -1 != r.value.indexOf(t.props.value)
          })),
          'select' == n &&
            null != r.defaultValue &&
            (r.value = tr(e.children).forEach(function (t) {
              t.props.selected = r.multiple
                ? -1 != r.defaultValue.indexOf(t.props.value)
                : r.defaultValue == t.props.value
            })),
          e.class && !e.className
            ? ((r.class = e.class), Object.defineProperty(r, 'className', Zr))
            : ((e.className && !e.class) || (e.class && e.className)) &&
              (r.class = r.className = e.className),
          (t.props = r)
      })(t),
      (t.$$typeof = zr),
      $r && $r(t)
  }
  var Jr = An.__r
  An.__r = function (t) {
    Jr && Jr(t), t.__c
  }
  var Qr = An.diffed
  An.diffed = function (t) {
    Qr && Qr(t)
    var e = t.props,
      n = t.__e
    null != n &&
      'textarea' === t.type &&
      'value' in e &&
      e.value !== n.value &&
      (n.value = null == e.value ? '' : e.value)
  }
  var to = function (t, e) {
    return (
      (to =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, e) {
            t.__proto__ = e
          }) ||
        function (t, e) {
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
        }),
      to(t, e)
    )
  }
  function eo(t, e) {
    if ('function' != typeof e && null !== e)
      throw new TypeError(
        'Class extends value ' + String(e) + ' is not a constructor or null'
      )
    function n() {
      this.constructor = t
    }
    to(t, e),
      (t.prototype =
        null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()))
  }
  var no = function () {
    return (
      (no =
        Object.assign ||
        function (t) {
          for (var e, n = 1, r = arguments.length; n < r; n++)
            for (var o in (e = arguments[n]))
              Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
          return t
        }),
      no.apply(this, arguments)
    )
  }
  function ro(t, e) {
    var n = {}
    for (var r in t)
      Object.prototype.hasOwnProperty.call(t, r) &&
        e.indexOf(r) < 0 &&
        (n[r] = t[r])
    if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
      var o = 0
      for (r = Object.getOwnPropertySymbols(t); o < r.length; o++)
        e.indexOf(r[o]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(t, r[o]) &&
          (n[r[o]] = t[r[o]])
    }
    return n
  }
  function oo(t, e, n, r) {
    var o,
      i = arguments.length,
      a =
        i < 3 ? e : null === r ? (r = Object.getOwnPropertyDescriptor(e, n)) : r
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, n, r)
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(e, n, a) : o(e, n)) || a)
    return i > 3 && a && Object.defineProperty(e, n, a), a
  }
  function io(t) {
    var e = 'function' == typeof Symbol && Symbol.iterator,
      n = e && t[e],
      r = 0
    if (n) return n.call(t)
    if (t && 'number' == typeof t.length)
      return {
        next: function () {
          return (
            t && r >= t.length && (t = void 0), { value: t && t[r++], done: !t }
          )
        }
      }
    throw new TypeError(
      e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
    )
  }
  function ao(t, e) {
    var n = 'function' == typeof Symbol && t[Symbol.iterator]
    if (!n) return t
    var r,
      o,
      i = n.call(t),
      a = []
    try {
      for (; (void 0 === e || e-- > 0) && !(r = i.next()).done; )
        a.push(r.value)
    } catch (t) {
      o = { error: t }
    } finally {
      try {
        r && !r.done && (n = i.return) && n.call(i)
      } finally {
        if (o) throw o.error
      }
    }
    return a
  }
  function so(t, e, n) {
    if (n || 2 === arguments.length)
      for (var r, o = 0, i = e.length; o < i; o++)
        (!r && o in e) ||
          (r || (r = Array.prototype.slice.call(e, 0, o)), (r[o] = e[o]))
    return t.concat(r || Array.prototype.slice.call(e))
  }
  'function' == typeof SuppressedError && SuppressedError
  var uo = 0
  function lo(t, e, n, r, o, i) {
    e || (e = {})
    var a,
      s,
      u = e
    if ('ref' in u)
      for (s in ((u = {}), e)) 'ref' == s ? (a = e[s]) : (u[s] = e[s])
    var l = {
      type: t,
      props: u,
      key: n,
      ref: a,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: void 0,
      __c: null,
      constructor: void 0,
      __v: --uo,
      __i: -1,
      __u: 0,
      __source: o,
      __self: i
    }
    if ('function' == typeof t && (a = t.defaultProps))
      for (s in a) void 0 === u[s] && (u[s] = a[s])
    return An.vnode && An.vnode(l), l
  }
  var co =
      'object' == typeof global && global && global.Object === Object && global,
    po = 'object' == typeof self && self && self.Object === Object && self,
    ho = co || po || Function('return this')(),
    fo = ho.Symbol,
    vo = Object.prototype,
    yo = vo.hasOwnProperty,
    go = vo.toString,
    _o = fo ? fo.toStringTag : void 0
  var mo = Object.prototype.toString
  var bo = '[object Null]',
    xo = '[object Undefined]',
    Eo = fo ? fo.toStringTag : void 0
  function Mo(t) {
    return null == t
      ? void 0 === t
        ? xo
        : bo
      : Eo && Eo in Object(t)
      ? (function (t) {
          var e = yo.call(t, _o),
            n = t[_o]
          try {
            t[_o] = void 0
            var r = !0
          } catch (t) {}
          var o = go.call(t)
          return r && (e ? (t[_o] = n) : delete t[_o]), o
        })(t)
      : (function (t) {
          return mo.call(t)
        })(t)
  }
  function To(t) {
    return null != t && 'object' == typeof t
  }
  var So = '[object Symbol]'
  function wo(t) {
    return 'symbol' == typeof t || (To(t) && Mo(t) == So)
  }
  var Ao = NaN
  function Oo(t) {
    return 'number' == typeof t ? t : wo(t) ? Ao : +t
  }
  function Do(t, e) {
    for (var n = -1, r = null == t ? 0 : t.length, o = Array(r); ++n < r; )
      o[n] = e(t[n], n, t)
    return o
  }
  var No = Array.isArray,
    Po = 1 / 0,
    Co = fo ? fo.prototype : void 0,
    Io = Co ? Co.toString : void 0
  function Lo(t) {
    if ('string' == typeof t) return t
    if (No(t)) return Do(t, Lo) + ''
    if (wo(t)) return Io ? Io.call(t) : ''
    var e = t + ''
    return '0' == e && 1 / t == -Po ? '-0' : e
  }
  function jo(t, e) {
    return function (n, r) {
      var o
      if (void 0 === n && void 0 === r) return e
      if ((void 0 !== n && (o = n), void 0 !== r)) {
        if (void 0 === o) return r
        'string' == typeof n || 'string' == typeof r
          ? ((n = Lo(n)), (r = Lo(r)))
          : ((n = Oo(n)), (r = Oo(r))),
          (o = t(n, r))
      }
      return o
    }
  }
  var Ro = jo(function (t, e) {
      return t + e
    }, 0),
    ko = /\s/
  function Bo(t) {
    for (var e = t.length; e-- && ko.test(t.charAt(e)); );
    return e
  }
  var zo = /^\s+/
  function Uo(t) {
    return t ? t.slice(0, Bo(t) + 1).replace(zo, '') : t
  }
  function Ho(t) {
    var e = typeof t
    return null != t && ('object' == e || 'function' == e)
  }
  var Xo = NaN,
    Go = /^[-+]0x[0-9a-f]+$/i,
    Wo = /^0b[01]+$/i,
    Yo = /^0o[0-7]+$/i,
    Fo = parseInt
  function Vo(t) {
    if ('number' == typeof t) return t
    if (wo(t)) return Xo
    if (Ho(t)) {
      var e = 'function' == typeof t.valueOf ? t.valueOf() : t
      t = Ho(e) ? e + '' : e
    }
    if ('string' != typeof t) return 0 === t ? t : +t
    t = Uo(t)
    var n = Wo.test(t)
    return n || Yo.test(t) ? Fo(t.slice(2), n ? 2 : 8) : Go.test(t) ? Xo : +t
  }
  var Ko = 1 / 0,
    qo = 17976931348623157e292
  function Zo(t) {
    return t
      ? (t = Vo(t)) === Ko || t === -Ko
        ? (t < 0 ? -1 : 1) * qo
        : t == t
        ? t
        : 0
      : 0 === t
      ? t
      : 0
  }
  function $o(t) {
    var e = Zo(t),
      n = e % 1
    return e == e ? (n ? e - n : e) : 0
  }
  function Jo(t) {
    return t
  }
  var Qo = '[object AsyncFunction]',
    ti = '[object Function]',
    ei = '[object GeneratorFunction]',
    ni = '[object Proxy]'
  function ri(t) {
    if (!Ho(t)) return !1
    var e = Mo(t)
    return e == ti || e == ei || e == Qo || e == ni
  }
  var oi,
    ii = ho['__core-js_shared__'],
    ai = (oi = /[^.]+$/.exec((ii && ii.keys && ii.keys.IE_PROTO) || ''))
      ? 'Symbol(src)_1.' + oi
      : ''
  var si = Function.prototype.toString
  function ui(t) {
    if (null != t) {
      try {
        return si.call(t)
      } catch (t) {}
      try {
        return t + ''
      } catch (t) {}
    }
    return ''
  }
  var li = /^\[object .+?Constructor\]$/,
    ci = Function.prototype,
    di = Object.prototype,
    pi = ci.toString,
    hi = di.hasOwnProperty,
    fi = RegExp(
      '^' +
        pi
          .call(hi)
          .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            '$1.*?'
          ) +
        '$'
    )
  function vi(t) {
    return (
      !(
        !Ho(t) ||
        (function (t) {
          return !!ai && ai in t
        })(t)
      ) && (ri(t) ? fi : li).test(ui(t))
    )
  }
  function yi(t, e) {
    var n = (function (t, e) {
      return null == t ? void 0 : t[e]
    })(t, e)
    return vi(n) ? n : void 0
  }
  var gi = yi(ho, 'WeakMap'),
    _i = gi && new gi(),
    mi = _i
      ? function (t, e) {
          return _i.set(t, e), t
        }
      : Jo,
    bi = Object.create,
    xi = (function () {
      function t() {}
      return function (e) {
        if (!Ho(e)) return {}
        if (bi) return bi(e)
        t.prototype = e
        var n = new t()
        return (t.prototype = void 0), n
      }
    })()
  function Ei(t) {
    return function () {
      var e = arguments
      switch (e.length) {
        case 0:
          return new t()
        case 1:
          return new t(e[0])
        case 2:
          return new t(e[0], e[1])
        case 3:
          return new t(e[0], e[1], e[2])
        case 4:
          return new t(e[0], e[1], e[2], e[3])
        case 5:
          return new t(e[0], e[1], e[2], e[3], e[4])
        case 6:
          return new t(e[0], e[1], e[2], e[3], e[4], e[5])
        case 7:
          return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6])
      }
      var n = xi(t.prototype),
        r = t.apply(n, e)
      return Ho(r) ? r : n
    }
  }
  var Mi = 1
  function Ti(t, e, n) {
    switch (n.length) {
      case 0:
        return t.call(e)
      case 1:
        return t.call(e, n[0])
      case 2:
        return t.call(e, n[0], n[1])
      case 3:
        return t.call(e, n[0], n[1], n[2])
    }
    return t.apply(e, n)
  }
  var Si = Math.max
  function wi(t, e, n, r) {
    for (
      var o = -1,
        i = t.length,
        a = n.length,
        s = -1,
        u = e.length,
        l = Si(i - a, 0),
        c = Array(u + l),
        d = !r;
      ++s < u;

    )
      c[s] = e[s]
    for (; ++o < a; ) (d || o < i) && (c[n[o]] = t[o])
    for (; l--; ) c[s++] = t[o++]
    return c
  }
  var Ai = Math.max
  function Oi(t, e, n, r) {
    for (
      var o = -1,
        i = t.length,
        a = -1,
        s = n.length,
        u = -1,
        l = e.length,
        c = Ai(i - s, 0),
        d = Array(c + l),
        p = !r;
      ++o < c;

    )
      d[o] = t[o]
    for (var h = o; ++u < l; ) d[h + u] = e[u]
    for (; ++a < s; ) (p || o < i) && (d[h + n[a]] = t[o++])
    return d
  }
  function Di() {}
  var Ni = 4294967295
  function Pi(t) {
    ;(this.__wrapped__ = t),
      (this.__actions__ = []),
      (this.__dir__ = 1),
      (this.__filtered__ = !1),
      (this.__iteratees__ = []),
      (this.__takeCount__ = Ni),
      (this.__views__ = [])
  }
  function Ci() {}
  ;(Pi.prototype = xi(Di.prototype)), (Pi.prototype.constructor = Pi)
  var Ii = _i
      ? function (t) {
          return _i.get(t)
        }
      : Ci,
    Li = {},
    ji = Object.prototype.hasOwnProperty
  function Ri(t) {
    for (
      var e = t.name + '', n = Li[e], r = ji.call(Li, e) ? n.length : 0;
      r--;

    ) {
      var o = n[r],
        i = o.func
      if (null == i || i == t) return o.name
    }
    return e
  }
  function ki(t, e) {
    ;(this.__wrapped__ = t),
      (this.__actions__ = []),
      (this.__chain__ = !!e),
      (this.__index__ = 0),
      (this.__values__ = void 0)
  }
  function Bi(t, e) {
    var n = -1,
      r = t.length
    for (e || (e = Array(r)); ++n < r; ) e[n] = t[n]
    return e
  }
  function zi(t) {
    if (t instanceof Pi) return t.clone()
    var e = new ki(t.__wrapped__, t.__chain__)
    return (
      (e.__actions__ = Bi(t.__actions__)),
      (e.__index__ = t.__index__),
      (e.__values__ = t.__values__),
      e
    )
  }
  ;(ki.prototype = xi(Di.prototype)), (ki.prototype.constructor = ki)
  var Ui = Object.prototype.hasOwnProperty
  function Hi(t) {
    if (To(t) && !No(t) && !(t instanceof Pi)) {
      if (t instanceof ki) return t
      if (Ui.call(t, '__wrapped__')) return zi(t)
    }
    return new ki(t)
  }
  function Xi(t) {
    var e = Ri(t),
      n = Hi[e]
    if ('function' != typeof n || !(e in Pi.prototype)) return !1
    if (t === n) return !0
    var r = Ii(n)
    return !!r && t === r[0]
  }
  ;(Hi.prototype = Di.prototype), (Hi.prototype.constructor = Hi)
  var Gi = Date.now
  function Wi(t) {
    var e = 0,
      n = 0
    return function () {
      var r = Gi(),
        o = 16 - (r - n)
      if (((n = r), o > 0)) {
        if (++e >= 800) return arguments[0]
      } else e = 0
      return t.apply(void 0, arguments)
    }
  }
  var Yi = Wi(mi),
    Fi = /\{\n\/\* \[wrapped with (.+)\] \*/,
    Vi = /,? & /
  var Ki = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/
  function qi(t) {
    return function () {
      return t
    }
  }
  var Zi = (function () {
      try {
        var t = yi(Object, 'defineProperty')
        return t({}, '', {}), t
      } catch (t) {}
    })(),
    $i = Zi
      ? function (t, e) {
          return Zi(t, 'toString', {
            configurable: !0,
            enumerable: !1,
            value: qi(e),
            writable: !0
          })
        }
      : Jo,
    Ji = Wi($i)
  function Qi(t, e) {
    for (
      var n = -1, r = null == t ? 0 : t.length;
      ++n < r && !1 !== e(t[n], n, t);

    );
    return t
  }
  function ta(t, e, n, r) {
    for (var o = t.length, i = n + (r ? 1 : -1); r ? i-- : ++i < o; )
      if (e(t[i], i, t)) return i
    return -1
  }
  function ea(t) {
    return t != t
  }
  function na(t, e, n) {
    return e == e
      ? (function (t, e, n) {
          for (var r = n - 1, o = t.length; ++r < o; ) if (t[r] === e) return r
          return -1
        })(t, e, n)
      : ta(t, ea, n)
  }
  function ra(t, e) {
    return !!(null == t ? 0 : t.length) && na(t, e, 0) > -1
  }
  var oa = [
    ['ary', 128],
    ['bind', 1],
    ['bindKey', 2],
    ['curry', 8],
    ['curryRight', 16],
    ['flip', 512],
    ['partial', 32],
    ['partialRight', 64],
    ['rearg', 256]
  ]
  function ia(t, e, n) {
    var r = e + ''
    return Ji(
      t,
      (function (t, e) {
        var n = e.length
        if (!n) return t
        var r = n - 1
        return (
          (e[r] = (n > 1 ? '& ' : '') + e[r]),
          (e = e.join(n > 2 ? ', ' : ' ')),
          t.replace(Ki, '{\n/* [wrapped with ' + e + '] */\n')
        )
      })(
        r,
        (function (t, e) {
          return (
            Qi(oa, function (n) {
              var r = '_.' + n[0]
              e & n[1] && !ra(t, r) && t.push(r)
            }),
            t.sort()
          )
        })(
          (function (t) {
            var e = t.match(Fi)
            return e ? e[1].split(Vi) : []
          })(r),
          n
        )
      )
    )
  }
  var aa = 1,
    sa = 2,
    ua = 4,
    la = 8,
    ca = 32,
    da = 64
  function pa(t, e, n, r, o, i, a, s, u, l) {
    var c = e & la
    ;(e |= c ? ca : da), (e &= ~(c ? da : ca)) & ua || (e &= ~(aa | sa))
    var d = [
        t,
        e,
        o,
        c ? i : void 0,
        c ? a : void 0,
        c ? void 0 : i,
        c ? void 0 : a,
        s,
        u,
        l
      ],
      p = n.apply(void 0, d)
    return Xi(t) && Yi(p, d), (p.placeholder = r), ia(p, t, e)
  }
  function ha(t) {
    return t.placeholder
  }
  var fa = 9007199254740991,
    va = /^(?:0|[1-9]\d*)$/
  function ya(t, e) {
    var n = typeof t
    return (
      !!(e = null == e ? fa : e) &&
      ('number' == n || ('symbol' != n && va.test(t))) &&
      t > -1 &&
      t % 1 == 0 &&
      t < e
    )
  }
  var ga = Math.min
  var _a = '__lodash_placeholder__'
  function ma(t, e) {
    for (var n = -1, r = t.length, o = 0, i = []; ++n < r; ) {
      var a = t[n]
      ;(a !== e && a !== _a) || ((t[n] = _a), (i[o++] = n))
    }
    return i
  }
  var ba = 1,
    xa = 2,
    Ea = 8,
    Ma = 16,
    Ta = 128,
    Sa = 512
  function wa(t, e, n, r, o, i, a, s, u, l) {
    var c = e & Ta,
      d = e & ba,
      p = e & xa,
      h = e & (Ea | Ma),
      f = e & Sa,
      v = p ? void 0 : Ei(t)
    return function y() {
      for (var g = arguments.length, _ = Array(g), m = g; m--; )
        _[m] = arguments[m]
      if (h)
        var b = ha(y),
          x = (function (t, e) {
            for (var n = t.length, r = 0; n--; ) t[n] === e && ++r
            return r
          })(_, b)
      if (
        (r && (_ = wi(_, r, o, h)),
        i && (_ = Oi(_, i, a, h)),
        (g -= x),
        h && g < l)
      ) {
        var E = ma(_, b)
        return pa(t, e, wa, y.placeholder, n, _, E, s, u, l - g)
      }
      var M = d ? n : this,
        T = p ? M[t] : t
      return (
        (g = _.length),
        s
          ? (_ = (function (t, e) {
              for (var n = t.length, r = ga(e.length, n), o = Bi(t); r--; ) {
                var i = e[r]
                t[r] = ya(i, n) ? o[i] : void 0
              }
              return t
            })(_, s))
          : f && g > 1 && _.reverse(),
        c && u < g && (_.length = u),
        this && this !== ho && this instanceof y && (T = v || Ei(T)),
        T.apply(M, _)
      )
    }
  }
  var Aa = 1
  var Oa = '__lodash_placeholder__',
    Da = 1,
    Na = 2,
    Pa = 4,
    Ca = 8,
    Ia = 128,
    La = 256,
    ja = Math.min
  var Ra = 'Expected a function',
    ka = 1,
    Ba = 2,
    za = 8,
    Ua = 16,
    Ha = 32,
    Xa = 64,
    Ga = Math.max
  function Wa(t, e, n, r, o, i, a, s) {
    var u = e & Ba
    if (!u && 'function' != typeof t) throw new TypeError(Ra)
    var l = r ? r.length : 0
    if (
      (l || ((e &= ~(Ha | Xa)), (r = o = void 0)),
      (a = void 0 === a ? a : Ga($o(a), 0)),
      (s = void 0 === s ? s : $o(s)),
      (l -= o ? o.length : 0),
      e & Xa)
    ) {
      var c = r,
        d = o
      r = o = void 0
    }
    var p = u ? void 0 : Ii(t),
      h = [t, e, n, r, o, c, d, i, a, s]
    if (
      (p &&
        (function (t, e) {
          var n = t[1],
            r = e[1],
            o = n | r,
            i = o < (Da | Na | Ia),
            a =
              (r == Ia && n == Ca) ||
              (r == Ia && n == La && t[7].length <= e[8]) ||
              (r == (Ia | La) && e[7].length <= e[8] && n == Ca)
          if (!i && !a) return t
          r & Da && ((t[2] = e[2]), (o |= n & Da ? 0 : Pa))
          var s = e[3]
          if (s) {
            var u = t[3]
            ;(t[3] = u ? wi(u, s, e[4]) : s), (t[4] = u ? ma(t[3], Oa) : e[4])
          }
          ;(s = e[5]) &&
            ((u = t[5]),
            (t[5] = u ? Oi(u, s, e[6]) : s),
            (t[6] = u ? ma(t[5], Oa) : e[6])),
            (s = e[7]) && (t[7] = s),
            r & Ia && (t[8] = null == t[8] ? e[8] : ja(t[8], e[8])),
            null == t[9] && (t[9] = e[9]),
            (t[0] = e[0]),
            (t[1] = o)
        })(h, p),
      (t = h[0]),
      (e = h[1]),
      (n = h[2]),
      (r = h[3]),
      (o = h[4]),
      !(s = h[9] = void 0 === h[9] ? (u ? 0 : t.length) : Ga(h[9] - l, 0)) &&
        e & (za | Ua) &&
        (e &= ~(za | Ua)),
      e && e != ka)
    )
      f =
        e == za || e == Ua
          ? (function (t, e, n) {
              var r = Ei(t)
              return function o() {
                for (
                  var i = arguments.length, a = Array(i), s = i, u = ha(o);
                  s--;

                )
                  a[s] = arguments[s]
                var l = i < 3 && a[0] !== u && a[i - 1] !== u ? [] : ma(a, u)
                return (i -= l.length) < n
                  ? pa(
                      t,
                      e,
                      wa,
                      o.placeholder,
                      void 0,
                      a,
                      l,
                      void 0,
                      void 0,
                      n - i
                    )
                  : Ti(
                      this && this !== ho && this instanceof o ? r : t,
                      this,
                      a
                    )
              }
            })(t, e, s)
          : (e != Ha && e != (ka | Ha)) || o.length
          ? wa.apply(void 0, h)
          : (function (t, e, n, r) {
              var o = e & Aa,
                i = Ei(t)
              return function e() {
                for (
                  var a = -1,
                    s = arguments.length,
                    u = -1,
                    l = r.length,
                    c = Array(l + s),
                    d = this && this !== ho && this instanceof e ? i : t;
                  ++u < l;

                )
                  c[u] = r[u]
                for (; s--; ) c[u++] = arguments[++a]
                return Ti(d, o ? n : this, c)
              }
            })(t, e, n, r)
    else
      var f = (function (t, e, n) {
        var r = e & Mi,
          o = Ei(t)
        return function e() {
          return (this && this !== ho && this instanceof e ? o : t).apply(
            r ? n : this,
            arguments
          )
        }
      })(t, e, n)
    return ia((p ? mi : Yi)(f, h), t, e)
  }
  var Ya = 128
  function Fa(t, e, n) {
    return (
      (e = n ? void 0 : e),
      (e = t && null == e ? t.length : e),
      Wa(t, Ya, void 0, void 0, void 0, void 0, e)
    )
  }
  function Va(t, e, n) {
    '__proto__' == e && Zi
      ? Zi(t, e, { configurable: !0, enumerable: !0, value: n, writable: !0 })
      : (t[e] = n)
  }
  function Ka(t, e) {
    return t === e || (t != t && e != e)
  }
  var qa = Object.prototype.hasOwnProperty
  function Za(t, e, n) {
    var r = t[e]
    ;(qa.call(t, e) && Ka(r, n) && (void 0 !== n || e in t)) || Va(t, e, n)
  }
  function $a(t, e, n, r) {
    var o = !n
    n || (n = {})
    for (var i = -1, a = e.length; ++i < a; ) {
      var s = e[i],
        u = r ? r(n[s], t[s], s, n, t) : void 0
      void 0 === u && (u = t[s]), o ? Va(n, s, u) : Za(n, s, u)
    }
    return n
  }
  var Ja = Math.max
  function Qa(t, e, n) {
    return (
      (e = Ja(void 0 === e ? t.length - 1 : e, 0)),
      function () {
        for (
          var r = arguments, o = -1, i = Ja(r.length - e, 0), a = Array(i);
          ++o < i;

        )
          a[o] = r[e + o]
        o = -1
        for (var s = Array(e + 1); ++o < e; ) s[o] = r[o]
        return (s[e] = n(a)), Ti(t, this, s)
      }
    )
  }
  function ts(t, e) {
    return Ji(Qa(t, e, Jo), t + '')
  }
  var es = 9007199254740991
  function ns(t) {
    return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= es
  }
  function rs(t) {
    return null != t && ns(t.length) && !ri(t)
  }
  function os(t, e, n) {
    if (!Ho(n)) return !1
    var r = typeof e
    return (
      !!('number' == r ? rs(n) && ya(e, n.length) : 'string' == r && e in n) &&
      Ka(n[e], t)
    )
  }
  function is(t) {
    return ts(function (e, n) {
      var r = -1,
        o = n.length,
        i = o > 1 ? n[o - 1] : void 0,
        a = o > 2 ? n[2] : void 0
      for (
        i = t.length > 3 && 'function' == typeof i ? (o--, i) : void 0,
          a && os(n[0], n[1], a) && ((i = o < 3 ? void 0 : i), (o = 1)),
          e = Object(e);
        ++r < o;

      ) {
        var s = n[r]
        s && t(e, s, r, i)
      }
      return e
    })
  }
  var as = Object.prototype
  function ss(t) {
    var e = t && t.constructor
    return t === (('function' == typeof e && e.prototype) || as)
  }
  function us(t, e) {
    for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n)
    return r
  }
  function ls(t) {
    return To(t) && '[object Arguments]' == Mo(t)
  }
  var cs = Object.prototype,
    ds = cs.hasOwnProperty,
    ps = cs.propertyIsEnumerable,
    hs = ls(
      (function () {
        return arguments
      })()
    )
      ? ls
      : function (t) {
          return To(t) && ds.call(t, 'callee') && !ps.call(t, 'callee')
        }
  function fs() {
    return !1
  }
  var vs = 'object' == typeof t && t && !t.nodeType && t,
    ys =
      vs && 'object' == typeof module && module && !module.nodeType && module,
    gs = ys && ys.exports === vs ? ho.Buffer : void 0,
    _s = (gs ? gs.isBuffer : void 0) || fs,
    ms = {}
  function bs(t) {
    return function (e) {
      return t(e)
    }
  }
  ;(ms['[object Float32Array]'] =
    ms['[object Float64Array]'] =
    ms['[object Int8Array]'] =
    ms['[object Int16Array]'] =
    ms['[object Int32Array]'] =
    ms['[object Uint8Array]'] =
    ms['[object Uint8ClampedArray]'] =
    ms['[object Uint16Array]'] =
    ms['[object Uint32Array]'] =
      !0),
    (ms['[object Arguments]'] =
      ms['[object Array]'] =
      ms['[object ArrayBuffer]'] =
      ms['[object Boolean]'] =
      ms['[object DataView]'] =
      ms['[object Date]'] =
      ms['[object Error]'] =
      ms['[object Function]'] =
      ms['[object Map]'] =
      ms['[object Number]'] =
      ms['[object Object]'] =
      ms['[object RegExp]'] =
      ms['[object Set]'] =
      ms['[object String]'] =
      ms['[object WeakMap]'] =
        !1)
  var xs = 'object' == typeof t && t && !t.nodeType && t,
    Es =
      xs && 'object' == typeof module && module && !module.nodeType && module,
    Ms = Es && Es.exports === xs && co.process,
    Ts = (function () {
      try {
        var t = Es && Es.require && Es.require('util').types
        return t || (Ms && Ms.binding && Ms.binding('util'))
      } catch (t) {}
    })(),
    Ss = Ts && Ts.isTypedArray,
    ws = Ss
      ? bs(Ss)
      : function (t) {
          return To(t) && ns(t.length) && !!ms[Mo(t)]
        },
    As = Object.prototype.hasOwnProperty
  function Os(t, e) {
    var n = No(t),
      r = !n && hs(t),
      o = !n && !r && _s(t),
      i = !n && !r && !o && ws(t),
      a = n || r || o || i,
      s = a ? us(t.length, String) : [],
      u = s.length
    for (var l in t)
      (!e && !As.call(t, l)) ||
        (a &&
          ('length' == l ||
            (o && ('offset' == l || 'parent' == l)) ||
            (i && ('buffer' == l || 'byteLength' == l || 'byteOffset' == l)) ||
            ya(l, u))) ||
        s.push(l)
    return s
  }
  function Ds(t, e) {
    return function (n) {
      return t(e(n))
    }
  }
  var Ns = Ds(Object.keys, Object),
    Ps = Object.prototype.hasOwnProperty
  function Cs(t) {
    if (!ss(t)) return Ns(t)
    var e = []
    for (var n in Object(t)) Ps.call(t, n) && 'constructor' != n && e.push(n)
    return e
  }
  function Is(t) {
    return rs(t) ? Os(t) : Cs(t)
  }
  var Ls = Object.prototype.hasOwnProperty,
    js = is(function (t, e) {
      if (ss(e) || rs(e)) $a(e, Is(e), t)
      else for (var n in e) Ls.call(e, n) && Za(t, n, e[n])
    })
  var Rs = Object.prototype.hasOwnProperty
  function ks(t) {
    if (!Ho(t))
      return (function (t) {
        var e = []
        if (null != t) for (var n in Object(t)) e.push(n)
        return e
      })(t)
    var e = ss(t),
      n = []
    for (var r in t) ('constructor' != r || (!e && Rs.call(t, r))) && n.push(r)
    return n
  }
  function Bs(t) {
    return rs(t) ? Os(t, !0) : ks(t)
  }
  var zs = is(function (t, e) {
      $a(e, Bs(e), t)
    }),
    Us = is(function (t, e, n, r) {
      $a(e, Bs(e), t, r)
    }),
    Hs = is(function (t, e, n, r) {
      $a(e, Is(e), t, r)
    }),
    Xs = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    Gs = /^\w*$/
  function Ws(t, e) {
    if (No(t)) return !1
    var n = typeof t
    return (
      !(
        'number' != n &&
        'symbol' != n &&
        'boolean' != n &&
        null != t &&
        !wo(t)
      ) ||
      Gs.test(t) ||
      !Xs.test(t) ||
      (null != e && t in Object(e))
    )
  }
  var Ys = yi(Object, 'create')
  var Fs = Object.prototype.hasOwnProperty
  var Vs = Object.prototype.hasOwnProperty
  function Ks(t) {
    var e = -1,
      n = null == t ? 0 : t.length
    for (this.clear(); ++e < n; ) {
      var r = t[e]
      this.set(r[0], r[1])
    }
  }
  function qs(t, e) {
    for (var n = t.length; n--; ) if (Ka(t[n][0], e)) return n
    return -1
  }
  ;(Ks.prototype.clear = function () {
    ;(this.__data__ = Ys ? Ys(null) : {}), (this.size = 0)
  }),
    (Ks.prototype.delete = function (t) {
      var e = this.has(t) && delete this.__data__[t]
      return (this.size -= e ? 1 : 0), e
    }),
    (Ks.prototype.get = function (t) {
      var e = this.__data__
      if (Ys) {
        var n = e[t]
        return '__lodash_hash_undefined__' === n ? void 0 : n
      }
      return Fs.call(e, t) ? e[t] : void 0
    }),
    (Ks.prototype.has = function (t) {
      var e = this.__data__
      return Ys ? void 0 !== e[t] : Vs.call(e, t)
    }),
    (Ks.prototype.set = function (t, e) {
      var n = this.__data__
      return (
        (this.size += this.has(t) ? 0 : 1),
        (n[t] = Ys && void 0 === e ? '__lodash_hash_undefined__' : e),
        this
      )
    })
  var Zs = Array.prototype.splice
  function $s(t) {
    var e = -1,
      n = null == t ? 0 : t.length
    for (this.clear(); ++e < n; ) {
      var r = t[e]
      this.set(r[0], r[1])
    }
  }
  ;($s.prototype.clear = function () {
    ;(this.__data__ = []), (this.size = 0)
  }),
    ($s.prototype.delete = function (t) {
      var e = this.__data__,
        n = qs(e, t)
      return (
        !(n < 0) &&
        (n == e.length - 1 ? e.pop() : Zs.call(e, n, 1), --this.size, !0)
      )
    }),
    ($s.prototype.get = function (t) {
      var e = this.__data__,
        n = qs(e, t)
      return n < 0 ? void 0 : e[n][1]
    }),
    ($s.prototype.has = function (t) {
      return qs(this.__data__, t) > -1
    }),
    ($s.prototype.set = function (t, e) {
      var n = this.__data__,
        r = qs(n, t)
      return r < 0 ? (++this.size, n.push([t, e])) : (n[r][1] = e), this
    })
  var Js = yi(ho, 'Map')
  function Qs(t, e) {
    var n,
      r,
      o = t.__data__
    return (
      'string' == (r = typeof (n = e)) ||
      'number' == r ||
      'symbol' == r ||
      'boolean' == r
        ? '__proto__' !== n
        : null === n
    )
      ? o['string' == typeof e ? 'string' : 'hash']
      : o.map
  }
  function tu(t) {
    var e = -1,
      n = null == t ? 0 : t.length
    for (this.clear(); ++e < n; ) {
      var r = t[e]
      this.set(r[0], r[1])
    }
  }
  ;(tu.prototype.clear = function () {
    ;(this.size = 0),
      (this.__data__ = {
        hash: new Ks(),
        map: new (Js || $s)(),
        string: new Ks()
      })
  }),
    (tu.prototype.delete = function (t) {
      var e = Qs(this, t).delete(t)
      return (this.size -= e ? 1 : 0), e
    }),
    (tu.prototype.get = function (t) {
      return Qs(this, t).get(t)
    }),
    (tu.prototype.has = function (t) {
      return Qs(this, t).has(t)
    }),
    (tu.prototype.set = function (t, e) {
      var n = Qs(this, t),
        r = n.size
      return n.set(t, e), (this.size += n.size == r ? 0 : 1), this
    })
  var eu = 'Expected a function'
  function nu(t, e) {
    if ('function' != typeof t || (null != e && 'function' != typeof e))
      throw new TypeError(eu)
    var n = function () {
      var r = arguments,
        o = e ? e.apply(this, r) : r[0],
        i = n.cache
      if (i.has(o)) return i.get(o)
      var a = t.apply(this, r)
      return (n.cache = i.set(o, a) || i), a
    }
    return (n.cache = new (nu.Cache || tu)()), n
  }
  nu.Cache = tu
  var ru =
      /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    ou = /\\(\\)?/g,
    iu = (function (t) {
      var e = nu(t, function (t) {
          return 500 === n.size && n.clear(), t
        }),
        n = e.cache
      return e
    })(function (t) {
      var e = []
      return (
        46 === t.charCodeAt(0) && e.push(''),
        t.replace(ru, function (t, n, r, o) {
          e.push(r ? o.replace(ou, '$1') : n || t)
        }),
        e
      )
    })
  function au(t) {
    return null == t ? '' : Lo(t)
  }
  function su(t, e) {
    return No(t) ? t : Ws(t, e) ? [t] : iu(au(t))
  }
  var uu = 1 / 0
  function lu(t) {
    if ('string' == typeof t || wo(t)) return t
    var e = t + ''
    return '0' == e && 1 / t == -uu ? '-0' : e
  }
  function cu(t, e) {
    for (var n = 0, r = (e = su(e, t)).length; null != t && n < r; )
      t = t[lu(e[n++])]
    return n && n == r ? t : void 0
  }
  function du(t, e, n) {
    var r = null == t ? void 0 : cu(t, e)
    return void 0 === r ? n : r
  }
  function pu(t, e) {
    for (var n = -1, r = e.length, o = Array(r), i = null == t; ++n < r; )
      o[n] = i ? void 0 : du(t, e[n])
    return o
  }
  function hu(t, e) {
    for (var n = -1, r = e.length, o = t.length; ++n < r; ) t[o + n] = e[n]
    return t
  }
  var fu = fo ? fo.isConcatSpreadable : void 0
  function vu(t) {
    return No(t) || hs(t) || !!(fu && t && t[fu])
  }
  function yu(t, e, n, r, o) {
    var i = -1,
      a = t.length
    for (n || (n = vu), o || (o = []); ++i < a; ) {
      var s = t[i]
      e > 0 && n(s)
        ? e > 1
          ? yu(s, e - 1, n, r, o)
          : hu(o, s)
        : r || (o[o.length] = s)
    }
    return o
  }
  function gu(t) {
    return (null == t ? 0 : t.length) ? yu(t, 1) : []
  }
  function _u(t) {
    return Ji(Qa(t, void 0, gu), t + '')
  }
  var mu = _u(pu),
    bu = Ds(Object.getPrototypeOf, Object),
    xu = '[object Object]',
    Eu = Function.prototype,
    Mu = Object.prototype,
    Tu = Eu.toString,
    Su = Mu.hasOwnProperty,
    wu = Tu.call(Object)
  function Au(t) {
    if (!To(t) || Mo(t) != xu) return !1
    var e = bu(t)
    if (null === e) return !0
    var n = Su.call(e, 'constructor') && e.constructor
    return 'function' == typeof n && n instanceof n && Tu.call(n) == wu
  }
  var Ou = '[object DOMException]',
    Du = '[object Error]'
  function Nu(t) {
    if (!To(t)) return !1
    var e = Mo(t)
    return (
      e == Du ||
      e == Ou ||
      ('string' == typeof t.message && 'string' == typeof t.name && !Au(t))
    )
  }
  var Pu = ts(function (t, e) {
      try {
        return Ti(t, void 0, e)
      } catch (t) {
        return Nu(t) ? t : new Error(t)
      }
    }),
    Cu = 'Expected a function'
  function Iu(t, e) {
    var n
    if ('function' != typeof e) throw new TypeError(Cu)
    return (
      (t = $o(t)),
      function () {
        return (
          --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = void 0), n
        )
      }
    )
  }
  var Lu = ts(function (t, e, n) {
    var r = 1
    if (n.length) {
      var o = ma(n, ha(Lu))
      r |= 32
    }
    return Wa(t, r, e, n, o)
  })
  Lu.placeholder = {}
  var ju = _u(function (t, e) {
      return (
        Qi(e, function (e) {
          ;(e = lu(e)), Va(t, e, Lu(t[e], t))
        }),
        t
      )
    }),
    Ru = ts(function (t, e, n) {
      var r = 3
      if (n.length) {
        var o = ma(n, ha(Ru))
        r |= 32
      }
      return Wa(e, r, t, n, o)
    })
  function ku(t, e, n) {
    var r = -1,
      o = t.length
    e < 0 && (e = -e > o ? 0 : o + e),
      (n = n > o ? o : n) < 0 && (n += o),
      (o = e > n ? 0 : (n - e) >>> 0),
      (e >>>= 0)
    for (var i = Array(o); ++r < o; ) i[r] = t[r + e]
    return i
  }
  function Bu(t, e, n) {
    var r = t.length
    return (n = void 0 === n ? r : n), !e && n >= r ? t : ku(t, e, n)
  }
  Ru.placeholder = {}
  var zu = RegExp(
    '[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]'
  )
  function Uu(t) {
    return zu.test(t)
  }
  var Hu = '\\ud800-\\udfff',
    Xu = '[' + Hu + ']',
    Gu = '[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]',
    Wu = '\\ud83c[\\udffb-\\udfff]',
    Yu = '[^' + Hu + ']',
    Fu = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    Vu = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    Ku = '(?:' + Gu + '|' + Wu + ')' + '?',
    qu = '[\\ufe0e\\ufe0f]?',
    Zu =
      qu +
      Ku +
      ('(?:\\u200d(?:' + [Yu, Fu, Vu].join('|') + ')' + qu + Ku + ')*'),
    $u = '(?:' + [Yu + Gu + '?', Gu, Fu, Vu, Xu].join('|') + ')',
    Ju = RegExp(Wu + '(?=' + Wu + ')|' + $u + Zu, 'g')
  function Qu(t) {
    return Uu(t)
      ? (function (t) {
          return t.match(Ju) || []
        })(t)
      : (function (t) {
          return t.split('')
        })(t)
  }
  function tl(t) {
    return function (e) {
      var n = Uu((e = au(e))) ? Qu(e) : void 0,
        r = n ? n[0] : e.charAt(0),
        o = n ? Bu(n, 1).join('') : e.slice(1)
      return r[t]() + o
    }
  }
  var el = tl('toUpperCase')
  function nl(t) {
    return el(au(t).toLowerCase())
  }
  function rl(t, e, n, r) {
    var o = -1,
      i = null == t ? 0 : t.length
    for (r && i && (n = t[++o]); ++o < i; ) n = e(n, t[o], o, t)
    return n
  }
  function ol(t) {
    return function (e) {
      return null == t ? void 0 : t[e]
    }
  }
  var il = ol({
      À: 'A',
      Á: 'A',
      Â: 'A',
      Ã: 'A',
      Ä: 'A',
      Å: 'A',
      à: 'a',
      á: 'a',
      â: 'a',
      ã: 'a',
      ä: 'a',
      å: 'a',
      Ç: 'C',
      ç: 'c',
      Ð: 'D',
      ð: 'd',
      È: 'E',
      É: 'E',
      Ê: 'E',
      Ë: 'E',
      è: 'e',
      é: 'e',
      ê: 'e',
      ë: 'e',
      Ì: 'I',
      Í: 'I',
      Î: 'I',
      Ï: 'I',
      ì: 'i',
      í: 'i',
      î: 'i',
      ï: 'i',
      Ñ: 'N',
      ñ: 'n',
      Ò: 'O',
      Ó: 'O',
      Ô: 'O',
      Õ: 'O',
      Ö: 'O',
      Ø: 'O',
      ò: 'o',
      ó: 'o',
      ô: 'o',
      õ: 'o',
      ö: 'o',
      ø: 'o',
      Ù: 'U',
      Ú: 'U',
      Û: 'U',
      Ü: 'U',
      ù: 'u',
      ú: 'u',
      û: 'u',
      ü: 'u',
      Ý: 'Y',
      ý: 'y',
      ÿ: 'y',
      Æ: 'Ae',
      æ: 'ae',
      Þ: 'Th',
      þ: 'th',
      ß: 'ss',
      Ā: 'A',
      Ă: 'A',
      Ą: 'A',
      ā: 'a',
      ă: 'a',
      ą: 'a',
      Ć: 'C',
      Ĉ: 'C',
      Ċ: 'C',
      Č: 'C',
      ć: 'c',
      ĉ: 'c',
      ċ: 'c',
      č: 'c',
      Ď: 'D',
      Đ: 'D',
      ď: 'd',
      đ: 'd',
      Ē: 'E',
      Ĕ: 'E',
      Ė: 'E',
      Ę: 'E',
      Ě: 'E',
      ē: 'e',
      ĕ: 'e',
      ė: 'e',
      ę: 'e',
      ě: 'e',
      Ĝ: 'G',
      Ğ: 'G',
      Ġ: 'G',
      Ģ: 'G',
      ĝ: 'g',
      ğ: 'g',
      ġ: 'g',
      ģ: 'g',
      Ĥ: 'H',
      Ħ: 'H',
      ĥ: 'h',
      ħ: 'h',
      Ĩ: 'I',
      Ī: 'I',
      Ĭ: 'I',
      Į: 'I',
      İ: 'I',
      ĩ: 'i',
      ī: 'i',
      ĭ: 'i',
      į: 'i',
      ı: 'i',
      Ĵ: 'J',
      ĵ: 'j',
      Ķ: 'K',
      ķ: 'k',
      ĸ: 'k',
      Ĺ: 'L',
      Ļ: 'L',
      Ľ: 'L',
      Ŀ: 'L',
      Ł: 'L',
      ĺ: 'l',
      ļ: 'l',
      ľ: 'l',
      ŀ: 'l',
      ł: 'l',
      Ń: 'N',
      Ņ: 'N',
      Ň: 'N',
      Ŋ: 'N',
      ń: 'n',
      ņ: 'n',
      ň: 'n',
      ŋ: 'n',
      Ō: 'O',
      Ŏ: 'O',
      Ő: 'O',
      ō: 'o',
      ŏ: 'o',
      ő: 'o',
      Ŕ: 'R',
      Ŗ: 'R',
      Ř: 'R',
      ŕ: 'r',
      ŗ: 'r',
      ř: 'r',
      Ś: 'S',
      Ŝ: 'S',
      Ş: 'S',
      Š: 'S',
      ś: 's',
      ŝ: 's',
      ş: 's',
      š: 's',
      Ţ: 'T',
      Ť: 'T',
      Ŧ: 'T',
      ţ: 't',
      ť: 't',
      ŧ: 't',
      Ũ: 'U',
      Ū: 'U',
      Ŭ: 'U',
      Ů: 'U',
      Ű: 'U',
      Ų: 'U',
      ũ: 'u',
      ū: 'u',
      ŭ: 'u',
      ů: 'u',
      ű: 'u',
      ų: 'u',
      Ŵ: 'W',
      ŵ: 'w',
      Ŷ: 'Y',
      ŷ: 'y',
      Ÿ: 'Y',
      Ź: 'Z',
      Ż: 'Z',
      Ž: 'Z',
      ź: 'z',
      ż: 'z',
      ž: 'z',
      Ĳ: 'IJ',
      ĳ: 'ij',
      Œ: 'Oe',
      œ: 'oe',
      ŉ: "'n",
      ſ: 's'
    }),
    al = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
    sl = RegExp('[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]', 'g')
  function ul(t) {
    return (t = au(t)) && t.replace(al, il).replace(sl, '')
  }
  var ll = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g
  var cl = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/
  var dl = '\\ud800-\\udfff',
    pl = '\\u2700-\\u27bf',
    hl = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    fl = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    vl =
      '\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    yl = '[' + vl + ']',
    gl = '\\d+',
    _l = '[' + pl + ']',
    ml = '[' + hl + ']',
    bl = '[^' + dl + vl + gl + pl + hl + fl + ']',
    xl = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    El = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    Ml = '[' + fl + ']',
    Tl = '(?:' + ml + '|' + bl + ')',
    Sl = '(?:' + Ml + '|' + bl + ')',
    wl = "(?:['’](?:d|ll|m|re|s|t|ve))?",
    Al = "(?:['’](?:D|LL|M|RE|S|T|VE))?",
    Ol =
      '(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?',
    Dl = '[\\ufe0e\\ufe0f]?',
    Nl =
      Dl +
      Ol +
      ('(?:\\u200d(?:' +
        ['[^' + dl + ']', xl, El].join('|') +
        ')' +
        Dl +
        Ol +
        ')*'),
    Pl = '(?:' + [_l, xl, El].join('|') + ')' + Nl,
    Cl = RegExp(
      [
        Ml + '?' + ml + '+' + wl + '(?=' + [yl, Ml, '$'].join('|') + ')',
        Sl + '+' + Al + '(?=' + [yl, Ml + Tl, '$'].join('|') + ')',
        Ml + '?' + Tl + '+' + wl,
        Ml + '+' + Al,
        '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
        '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
        gl,
        Pl
      ].join('|'),
      'g'
    )
  function Il(t, e, n) {
    return (
      (t = au(t)),
      void 0 === (e = n ? void 0 : e)
        ? (function (t) {
            return cl.test(t)
          })(t)
          ? (function (t) {
              return t.match(Cl) || []
            })(t)
          : (function (t) {
              return t.match(ll) || []
            })(t)
        : t.match(e) || []
    )
  }
  var Ll = RegExp("['’]", 'g')
  function jl(t) {
    return function (e) {
      return rl(Il(ul(e).replace(Ll, '')), t, '')
    }
  }
  var Rl = jl(function (t, e, n) {
    return (e = e.toLowerCase()), t + (n ? nl(e) : e)
  })
  var kl = ho.isFinite,
    Bl = Math.min
  function zl(t) {
    var e = Math[t]
    return function (t, n) {
      if (((t = Vo(t)), (n = null == n ? 0 : Bl($o(n), 292)) && kl(t))) {
        var r = (au(t) + 'e').split('e')
        return +(
          (r = (au(e(r[0] + 'e' + (+r[1] + n))) + 'e').split('e'))[0] +
          'e' +
          (+r[1] - n)
        )
      }
      return e(t)
    }
  }
  var Ul = zl('ceil')
  function Hl(t) {
    var e = Hi(t)
    return (e.__chain__ = !0), e
  }
  var Xl = Math.ceil,
    Gl = Math.max
  function Wl(t, e, n) {
    return (
      t == t &&
        (void 0 !== n && (t = t <= n ? t : n),
        void 0 !== e && (t = t >= e ? t : e)),
      t
    )
  }
  function Yl(t) {
    var e = (this.__data__ = new $s(t))
    this.size = e.size
  }
  function Fl(t, e) {
    return t && $a(e, Is(e), t)
  }
  ;(Yl.prototype.clear = function () {
    ;(this.__data__ = new $s()), (this.size = 0)
  }),
    (Yl.prototype.delete = function (t) {
      var e = this.__data__,
        n = e.delete(t)
      return (this.size = e.size), n
    }),
    (Yl.prototype.get = function (t) {
      return this.__data__.get(t)
    }),
    (Yl.prototype.has = function (t) {
      return this.__data__.has(t)
    }),
    (Yl.prototype.set = function (t, e) {
      var n = this.__data__
      if (n instanceof $s) {
        var r = n.__data__
        if (!Js || r.length < 199)
          return r.push([t, e]), (this.size = ++n.size), this
        n = this.__data__ = new tu(r)
      }
      return n.set(t, e), (this.size = n.size), this
    })
  var Vl = 'object' == typeof t && t && !t.nodeType && t,
    Kl =
      Vl && 'object' == typeof module && module && !module.nodeType && module,
    ql = Kl && Kl.exports === Vl ? ho.Buffer : void 0,
    Zl = ql ? ql.allocUnsafe : void 0
  function $l(t, e) {
    if (e) return t.slice()
    var n = t.length,
      r = Zl ? Zl(n) : new t.constructor(n)
    return t.copy(r), r
  }
  function Jl(t, e) {
    for (var n = -1, r = null == t ? 0 : t.length, o = 0, i = []; ++n < r; ) {
      var a = t[n]
      e(a, n, t) && (i[o++] = a)
    }
    return i
  }
  function Ql() {
    return []
  }
  var tc = Object.prototype.propertyIsEnumerable,
    ec = Object.getOwnPropertySymbols,
    nc = ec
      ? function (t) {
          return null == t
            ? []
            : ((t = Object(t)),
              Jl(ec(t), function (e) {
                return tc.call(t, e)
              }))
        }
      : Ql
  var rc = Object.getOwnPropertySymbols
    ? function (t) {
        for (var e = []; t; ) hu(e, nc(t)), (t = bu(t))
        return e
      }
    : Ql
  function oc(t, e, n) {
    var r = e(t)
    return No(t) ? r : hu(r, n(t))
  }
  function ic(t) {
    return oc(t, Is, nc)
  }
  function ac(t) {
    return oc(t, Bs, rc)
  }
  var sc = yi(ho, 'DataView'),
    uc = yi(ho, 'Promise'),
    lc = yi(ho, 'Set'),
    cc = '[object Map]',
    dc = '[object Promise]',
    pc = '[object Set]',
    hc = '[object WeakMap]',
    fc = '[object DataView]',
    vc = ui(sc),
    yc = ui(Js),
    gc = ui(uc),
    _c = ui(lc),
    mc = ui(gi),
    bc = Mo
  ;((sc && bc(new sc(new ArrayBuffer(1))) != fc) ||
    (Js && bc(new Js()) != cc) ||
    (uc && bc(uc.resolve()) != dc) ||
    (lc && bc(new lc()) != pc) ||
    (gi && bc(new gi()) != hc)) &&
    (bc = function (t) {
      var e = Mo(t),
        n = '[object Object]' == e ? t.constructor : void 0,
        r = n ? ui(n) : ''
      if (r)
        switch (r) {
          case vc:
            return fc
          case yc:
            return cc
          case gc:
            return dc
          case _c:
            return pc
          case mc:
            return hc
        }
      return e
    })
  var xc = bc,
    Ec = Object.prototype.hasOwnProperty
  var Mc = ho.Uint8Array
  function Tc(t) {
    var e = new t.constructor(t.byteLength)
    return new Mc(e).set(new Mc(t)), e
  }
  var Sc = /\w*$/
  var wc = fo ? fo.prototype : void 0,
    Ac = wc ? wc.valueOf : void 0
  function Oc(t, e) {
    var n = e ? Tc(t.buffer) : t.buffer
    return new t.constructor(n, t.byteOffset, t.length)
  }
  var Dc = '[object Boolean]',
    Nc = '[object Date]',
    Pc = '[object Map]',
    Cc = '[object Number]',
    Ic = '[object RegExp]',
    Lc = '[object Set]',
    jc = '[object String]',
    Rc = '[object Symbol]',
    kc = '[object ArrayBuffer]',
    Bc = '[object DataView]',
    zc = '[object Float32Array]',
    Uc = '[object Float64Array]',
    Hc = '[object Int8Array]',
    Xc = '[object Int16Array]',
    Gc = '[object Int32Array]',
    Wc = '[object Uint8Array]',
    Yc = '[object Uint8ClampedArray]',
    Fc = '[object Uint16Array]',
    Vc = '[object Uint32Array]'
  function Kc(t, e, n) {
    var r,
      o = t.constructor
    switch (e) {
      case kc:
        return Tc(t)
      case Dc:
      case Nc:
        return new o(+t)
      case Bc:
        return (function (t, e) {
          var n = e ? Tc(t.buffer) : t.buffer
          return new t.constructor(n, t.byteOffset, t.byteLength)
        })(t, n)
      case zc:
      case Uc:
      case Hc:
      case Xc:
      case Gc:
      case Wc:
      case Yc:
      case Fc:
      case Vc:
        return Oc(t, n)
      case Pc:
        return new o()
      case Cc:
      case jc:
        return new o(t)
      case Ic:
        return (function (t) {
          var e = new t.constructor(t.source, Sc.exec(t))
          return (e.lastIndex = t.lastIndex), e
        })(t)
      case Lc:
        return new o()
      case Rc:
        return (r = t), Ac ? Object(Ac.call(r)) : {}
    }
  }
  function qc(t) {
    return 'function' != typeof t.constructor || ss(t) ? {} : xi(bu(t))
  }
  var Zc = Ts && Ts.isMap,
    $c = Zc
      ? bs(Zc)
      : function (t) {
          return To(t) && '[object Map]' == xc(t)
        }
  var Jc = Ts && Ts.isSet,
    Qc = Jc
      ? bs(Jc)
      : function (t) {
          return To(t) && '[object Set]' == xc(t)
        },
    td = 1,
    ed = 2,
    nd = 4,
    rd = '[object Arguments]',
    od = '[object Function]',
    id = '[object GeneratorFunction]',
    ad = '[object Object]',
    sd = {}
  function ud(t, e, n, r, o, i) {
    var a,
      s = e & td,
      u = e & ed,
      l = e & nd
    if ((n && (a = o ? n(t, r, o, i) : n(t)), void 0 !== a)) return a
    if (!Ho(t)) return t
    var c = No(t)
    if (c) {
      if (
        ((a = (function (t) {
          var e = t.length,
            n = new t.constructor(e)
          return (
            e &&
              'string' == typeof t[0] &&
              Ec.call(t, 'index') &&
              ((n.index = t.index), (n.input = t.input)),
            n
          )
        })(t)),
        !s)
      )
        return Bi(t, a)
    } else {
      var d = xc(t),
        p = d == od || d == id
      if (_s(t)) return $l(t, s)
      if (d == ad || d == rd || (p && !o)) {
        if (((a = u || p ? {} : qc(t)), !s))
          return u
            ? (function (t, e) {
                return $a(t, rc(t), e)
              })(
                t,
                (function (t, e) {
                  return t && $a(e, Bs(e), t)
                })(a, t)
              )
            : (function (t, e) {
                return $a(t, nc(t), e)
              })(t, Fl(a, t))
      } else {
        if (!sd[d]) return o ? t : {}
        a = Kc(t, d, s)
      }
    }
    i || (i = new Yl())
    var h = i.get(t)
    if (h) return h
    i.set(t, a),
      Qc(t)
        ? t.forEach(function (r) {
            a.add(ud(r, e, n, r, t, i))
          })
        : $c(t) &&
          t.forEach(function (r, o) {
            a.set(o, ud(r, e, n, o, t, i))
          })
    var f = c ? void 0 : (l ? (u ? ac : ic) : u ? Bs : Is)(t)
    return (
      Qi(f || t, function (r, o) {
        f && (r = t[(o = r)]), Za(a, o, ud(r, e, n, o, t, i))
      }),
      a
    )
  }
  ;(sd[rd] =
    sd['[object Array]'] =
    sd['[object ArrayBuffer]'] =
    sd['[object DataView]'] =
    sd['[object Boolean]'] =
    sd['[object Date]'] =
    sd['[object Float32Array]'] =
    sd['[object Float64Array]'] =
    sd['[object Int8Array]'] =
    sd['[object Int16Array]'] =
    sd['[object Int32Array]'] =
    sd['[object Map]'] =
    sd['[object Number]'] =
    sd[ad] =
    sd['[object RegExp]'] =
    sd['[object Set]'] =
    sd['[object String]'] =
    sd['[object Symbol]'] =
    sd['[object Uint8Array]'] =
    sd['[object Uint8ClampedArray]'] =
    sd['[object Uint16Array]'] =
    sd['[object Uint32Array]'] =
      !0),
    (sd['[object Error]'] = sd[od] = sd['[object WeakMap]'] = !1)
  function ld(t) {
    return ud(t, 5)
  }
  function cd(t) {
    var e = -1,
      n = null == t ? 0 : t.length
    for (this.__data__ = new tu(); ++e < n; ) this.add(t[e])
  }
  function dd(t, e) {
    for (var n = -1, r = null == t ? 0 : t.length; ++n < r; )
      if (e(t[n], n, t)) return !0
    return !1
  }
  function pd(t, e) {
    return t.has(e)
  }
  ;(cd.prototype.add = cd.prototype.push =
    function (t) {
      return this.__data__.set(t, '__lodash_hash_undefined__'), this
    }),
    (cd.prototype.has = function (t) {
      return this.__data__.has(t)
    })
  var hd = 1,
    fd = 2
  function vd(t, e, n, r, o, i) {
    var a = n & hd,
      s = t.length,
      u = e.length
    if (s != u && !(a && u > s)) return !1
    var l = i.get(t),
      c = i.get(e)
    if (l && c) return l == e && c == t
    var d = -1,
      p = !0,
      h = n & fd ? new cd() : void 0
    for (i.set(t, e), i.set(e, t); ++d < s; ) {
      var f = t[d],
        v = e[d]
      if (r) var y = a ? r(v, f, d, e, t, i) : r(f, v, d, t, e, i)
      if (void 0 !== y) {
        if (y) continue
        p = !1
        break
      }
      if (h) {
        if (
          !dd(e, function (t, e) {
            if (!pd(h, e) && (f === t || o(f, t, n, r, i))) return h.push(e)
          })
        ) {
          p = !1
          break
        }
      } else if (f !== v && !o(f, v, n, r, i)) {
        p = !1
        break
      }
    }
    return i.delete(t), i.delete(e), p
  }
  function yd(t) {
    var e = -1,
      n = Array(t.size)
    return (
      t.forEach(function (t, r) {
        n[++e] = [r, t]
      }),
      n
    )
  }
  function gd(t) {
    var e = -1,
      n = Array(t.size)
    return (
      t.forEach(function (t) {
        n[++e] = t
      }),
      n
    )
  }
  var _d = 1,
    md = 2,
    bd = '[object Boolean]',
    xd = '[object Date]',
    Ed = '[object Error]',
    Md = '[object Map]',
    Td = '[object Number]',
    Sd = '[object RegExp]',
    wd = '[object Set]',
    Ad = '[object String]',
    Od = '[object Symbol]',
    Dd = '[object ArrayBuffer]',
    Nd = '[object DataView]',
    Pd = fo ? fo.prototype : void 0,
    Cd = Pd ? Pd.valueOf : void 0
  var Id = 1,
    Ld = Object.prototype.hasOwnProperty
  var jd = 1,
    Rd = '[object Arguments]',
    kd = '[object Array]',
    Bd = '[object Object]',
    zd = Object.prototype.hasOwnProperty
  function Ud(t, e, n, r, o, i) {
    var a = No(t),
      s = No(e),
      u = a ? kd : xc(t),
      l = s ? kd : xc(e),
      c = (u = u == Rd ? Bd : u) == Bd,
      d = (l = l == Rd ? Bd : l) == Bd,
      p = u == l
    if (p && _s(t)) {
      if (!_s(e)) return !1
      ;(a = !0), (c = !1)
    }
    if (p && !c)
      return (
        i || (i = new Yl()),
        a || ws(t)
          ? vd(t, e, n, r, o, i)
          : (function (t, e, n, r, o, i, a) {
              switch (n) {
                case Nd:
                  if (
                    t.byteLength != e.byteLength ||
                    t.byteOffset != e.byteOffset
                  )
                    return !1
                  ;(t = t.buffer), (e = e.buffer)
                case Dd:
                  return !(
                    t.byteLength != e.byteLength || !i(new Mc(t), new Mc(e))
                  )
                case bd:
                case xd:
                case Td:
                  return Ka(+t, +e)
                case Ed:
                  return t.name == e.name && t.message == e.message
                case Sd:
                case Ad:
                  return t == e + ''
                case Md:
                  var s = yd
                case wd:
                  var u = r & _d
                  if ((s || (s = gd), t.size != e.size && !u)) return !1
                  var l = a.get(t)
                  if (l) return l == e
                  ;(r |= md), a.set(t, e)
                  var c = vd(s(t), s(e), r, o, i, a)
                  return a.delete(t), c
                case Od:
                  if (Cd) return Cd.call(t) == Cd.call(e)
              }
              return !1
            })(t, e, u, n, r, o, i)
      )
    if (!(n & jd)) {
      var h = c && zd.call(t, '__wrapped__'),
        f = d && zd.call(e, '__wrapped__')
      if (h || f) {
        var v = h ? t.value() : t,
          y = f ? e.value() : e
        return i || (i = new Yl()), o(v, y, n, r, i)
      }
    }
    return (
      !!p &&
      (i || (i = new Yl()),
      (function (t, e, n, r, o, i) {
        var a = n & Id,
          s = ic(t),
          u = s.length
        if (u != ic(e).length && !a) return !1
        for (var l = u; l--; ) {
          var c = s[l]
          if (!(a ? c in e : Ld.call(e, c))) return !1
        }
        var d = i.get(t),
          p = i.get(e)
        if (d && p) return d == e && p == t
        var h = !0
        i.set(t, e), i.set(e, t)
        for (var f = a; ++l < u; ) {
          var v = t[(c = s[l])],
            y = e[c]
          if (r) var g = a ? r(y, v, c, e, t, i) : r(v, y, c, t, e, i)
          if (!(void 0 === g ? v === y || o(v, y, n, r, i) : g)) {
            h = !1
            break
          }
          f || (f = 'constructor' == c)
        }
        if (h && !f) {
          var _ = t.constructor,
            m = e.constructor
          _ == m ||
            !('constructor' in t) ||
            !('constructor' in e) ||
            ('function' == typeof _ &&
              _ instanceof _ &&
              'function' == typeof m &&
              m instanceof m) ||
            (h = !1)
        }
        return i.delete(t), i.delete(e), h
      })(t, e, n, r, o, i))
    )
  }
  function Hd(t, e, n, r, o) {
    return (
      t === e ||
      (null == t || null == e || (!To(t) && !To(e))
        ? t != t && e != e
        : Ud(t, e, n, r, Hd, o))
    )
  }
  var Xd = 1,
    Gd = 2
  function Wd(t, e, n, r) {
    var o = n.length,
      i = o,
      a = !r
    if (null == t) return !i
    for (t = Object(t); o--; ) {
      var s = n[o]
      if (a && s[2] ? s[1] !== t[s[0]] : !(s[0] in t)) return !1
    }
    for (; ++o < i; ) {
      var u = (s = n[o])[0],
        l = t[u],
        c = s[1]
      if (a && s[2]) {
        if (void 0 === l && !(u in t)) return !1
      } else {
        var d = new Yl()
        if (r) var p = r(l, c, u, t, e, d)
        if (!(void 0 === p ? Hd(c, l, Xd | Gd, r, d) : p)) return !1
      }
    }
    return !0
  }
  function Yd(t) {
    return t == t && !Ho(t)
  }
  function Fd(t) {
    for (var e = Is(t), n = e.length; n--; ) {
      var r = e[n],
        o = t[r]
      e[n] = [r, o, Yd(o)]
    }
    return e
  }
  function Vd(t, e) {
    return function (n) {
      return null != n && n[t] === e && (void 0 !== e || t in Object(n))
    }
  }
  function Kd(t) {
    var e = Fd(t)
    return 1 == e.length && e[0][2]
      ? Vd(e[0][0], e[0][1])
      : function (n) {
          return n === t || Wd(n, t, e)
        }
  }
  function qd(t, e) {
    return null != t && e in Object(t)
  }
  function Zd(t, e, n) {
    for (var r = -1, o = (e = su(e, t)).length, i = !1; ++r < o; ) {
      var a = lu(e[r])
      if (!(i = null != t && n(t, a))) break
      t = t[a]
    }
    return i || ++r != o
      ? i
      : !!(o = null == t ? 0 : t.length) &&
          ns(o) &&
          ya(a, o) &&
          (No(t) || hs(t))
  }
  function $d(t, e) {
    return null != t && Zd(t, e, qd)
  }
  var Jd = 1,
    Qd = 2
  function tp(t, e) {
    return Ws(t) && Yd(e)
      ? Vd(lu(t), e)
      : function (n) {
          var r = du(n, t)
          return void 0 === r && r === e ? $d(n, t) : Hd(e, r, Jd | Qd)
        }
  }
  function ep(t) {
    return function (e) {
      return null == e ? void 0 : e[t]
    }
  }
  function np(t) {
    return Ws(t)
      ? ep(lu(t))
      : (function (t) {
          return function (e) {
            return cu(e, t)
          }
        })(t)
  }
  function rp(t) {
    return 'function' == typeof t
      ? t
      : null == t
      ? Jo
      : 'object' == typeof t
      ? No(t)
        ? tp(t[0], t[1])
        : Kd(t)
      : np(t)
  }
  function op(t, e, n) {
    var r = n.length
    if (null == t) return !r
    for (t = Object(t); r--; ) {
      var o = n[r],
        i = e[o],
        a = t[o]
      if ((void 0 === a && !(o in t)) || !i(a)) return !1
    }
    return !0
  }
  function ip(t, e, n, r) {
    for (var o = -1, i = null == t ? 0 : t.length; ++o < i; ) {
      var a = t[o]
      e(r, a, n(a), t)
    }
    return r
  }
  function ap(t) {
    return function (e, n, r) {
      for (var o = -1, i = Object(e), a = r(e), s = a.length; s--; ) {
        var u = a[t ? s : ++o]
        if (!1 === n(i[u], u, i)) break
      }
      return e
    }
  }
  var sp = ap()
  function up(t, e) {
    return t && sp(t, e, Is)
  }
  function lp(t, e) {
    return function (n, r) {
      if (null == n) return n
      if (!rs(n)) return t(n, r)
      for (
        var o = n.length, i = e ? o : -1, a = Object(n);
        (e ? i-- : ++i < o) && !1 !== r(a[i], i, a);

      );
      return n
    }
  }
  var cp = lp(up)
  function dp(t, e, n, r) {
    return (
      cp(t, function (t, o, i) {
        e(r, t, n(t), i)
      }),
      r
    )
  }
  function pp(t, e) {
    return function (n, r) {
      var o = No(n) ? ip : dp,
        i = e ? e() : {}
      return o(n, t, rp(r), i)
    }
  }
  var hp = Object.prototype.hasOwnProperty,
    fp = pp(function (t, e, n) {
      hp.call(t, n) ? ++t[n] : Va(t, n, 1)
    })
  function vp(t, e, n) {
    var r = Wa(
      t,
      8,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      (e = n ? void 0 : e)
    )
    return (r.placeholder = vp.placeholder), r
  }
  vp.placeholder = {}
  function yp(t, e, n) {
    var r = Wa(
      t,
      16,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      (e = n ? void 0 : e)
    )
    return (r.placeholder = yp.placeholder), r
  }
  yp.placeholder = {}
  var gp = function () {
      return ho.Date.now()
    },
    _p = 'Expected a function',
    mp = Math.max,
    bp = Math.min
  function xp(t, e, n) {
    var r,
      o,
      i,
      a,
      s,
      u,
      l = 0,
      c = !1,
      d = !1,
      p = !0
    if ('function' != typeof t) throw new TypeError(_p)
    function h(e) {
      var n = r,
        i = o
      return (r = o = void 0), (l = e), (a = t.apply(i, n))
    }
    function f(t) {
      var n = t - u
      return void 0 === u || n >= e || n < 0 || (d && t - l >= i)
    }
    function v() {
      var t = gp()
      if (f(t)) return y(t)
      s = setTimeout(
        v,
        (function (t) {
          var n = e - (t - u)
          return d ? bp(n, i - (t - l)) : n
        })(t)
      )
    }
    function y(t) {
      return (s = void 0), p && r ? h(t) : ((r = o = void 0), a)
    }
    function g() {
      var t = gp(),
        n = f(t)
      if (((r = arguments), (o = this), (u = t), n)) {
        if (void 0 === s)
          return (function (t) {
            return (l = t), (s = setTimeout(v, e)), c ? h(t) : a
          })(u)
        if (d) return clearTimeout(s), (s = setTimeout(v, e)), h(u)
      }
      return void 0 === s && (s = setTimeout(v, e)), a
    }
    return (
      (e = Vo(e) || 0),
      Ho(n) &&
        ((c = !!n.leading),
        (i = (d = 'maxWait' in n) ? mp(Vo(n.maxWait) || 0, e) : i),
        (p = 'trailing' in n ? !!n.trailing : p)),
      (g.cancel = function () {
        void 0 !== s && clearTimeout(s), (l = 0), (r = u = o = s = void 0)
      }),
      (g.flush = function () {
        return void 0 === s ? a : y(gp())
      }),
      g
    )
  }
  var Ep = Object.prototype,
    Mp = Ep.hasOwnProperty,
    Tp = ts(function (t, e) {
      t = Object(t)
      var n = -1,
        r = e.length,
        o = r > 2 ? e[2] : void 0
      for (o && os(e[0], e[1], o) && (r = 1); ++n < r; )
        for (var i = e[n], a = Bs(i), s = -1, u = a.length; ++s < u; ) {
          var l = a[s],
            c = t[l]
          ;(void 0 === c || (Ka(c, Ep[l]) && !Mp.call(t, l))) && (t[l] = i[l])
        }
      return t
    })
  function Sp(t, e, n) {
    ;((void 0 !== n && !Ka(t[e], n)) || (void 0 === n && !(e in t))) &&
      Va(t, e, n)
  }
  function wp(t) {
    return To(t) && rs(t)
  }
  function Ap(t, e) {
    if (('constructor' !== e || 'function' != typeof t[e]) && '__proto__' != e)
      return t[e]
  }
  function Op(t) {
    return $a(t, Bs(t))
  }
  function Dp(t, e, n, r, o) {
    t !== e &&
      sp(
        e,
        function (i, a) {
          if ((o || (o = new Yl()), Ho(i)))
            !(function (t, e, n, r, o, i, a) {
              var s = Ap(t, n),
                u = Ap(e, n),
                l = a.get(u)
              if (l) Sp(t, n, l)
              else {
                var c = i ? i(s, u, n + '', t, e, a) : void 0,
                  d = void 0 === c
                if (d) {
                  var p = No(u),
                    h = !p && _s(u),
                    f = !p && !h && ws(u)
                  ;(c = u),
                    p || h || f
                      ? No(s)
                        ? (c = s)
                        : wp(s)
                        ? (c = Bi(s))
                        : h
                        ? ((d = !1), (c = $l(u, !0)))
                        : f
                        ? ((d = !1), (c = Oc(u, !0)))
                        : (c = [])
                      : Au(u) || hs(u)
                      ? ((c = s),
                        hs(s) ? (c = Op(s)) : (Ho(s) && !ri(s)) || (c = qc(u)))
                      : (d = !1)
                }
                d && (a.set(u, c), o(c, u, r, i, a), a.delete(u)), Sp(t, n, c)
              }
            })(t, e, a, n, Dp, r, o)
          else {
            var s = r ? r(Ap(t, a), i, a + '', t, e, o) : void 0
            void 0 === s && (s = i), Sp(t, a, s)
          }
        },
        Bs
      )
  }
  function Np(t, e, n, r, o, i) {
    return (
      Ho(t) && Ho(e) && (i.set(e, t), Dp(t, e, void 0, Np, i), i.delete(e)), t
    )
  }
  var Pp = is(function (t, e, n, r) {
      Dp(t, e, n, r)
    }),
    Cp = ts(function (t) {
      return t.push(void 0, Np), Ti(Pp, void 0, t)
    })
  function Ip(t, e, n) {
    if ('function' != typeof t) throw new TypeError('Expected a function')
    return setTimeout(function () {
      t.apply(void 0, n)
    }, e)
  }
  var Lp = ts(function (t, e) {
      return Ip(t, 1, e)
    }),
    jp = ts(function (t, e, n) {
      return Ip(t, Vo(e) || 0, n)
    })
  function Rp(t, e, n) {
    for (var r = -1, o = null == t ? 0 : t.length; ++r < o; )
      if (n(e, t[r])) return !0
    return !1
  }
  var kp = 200
  function Bp(t, e, n, r) {
    var o = -1,
      i = ra,
      a = !0,
      s = t.length,
      u = [],
      l = e.length
    if (!s) return u
    n && (e = Do(e, bs(n))),
      r
        ? ((i = Rp), (a = !1))
        : e.length >= kp && ((i = pd), (a = !1), (e = new cd(e)))
    t: for (; ++o < s; ) {
      var c = t[o],
        d = null == n ? c : n(c)
      if (((c = r || 0 !== c ? c : 0), a && d == d)) {
        for (var p = l; p--; ) if (e[p] === d) continue t
        u.push(c)
      } else i(e, d, r) || u.push(c)
    }
    return u
  }
  var zp = ts(function (t, e) {
    return wp(t) ? Bp(t, yu(e, 1, wp, !0)) : []
  })
  function Up(t) {
    var e = null == t ? 0 : t.length
    return e ? t[e - 1] : void 0
  }
  var Hp = ts(function (t, e) {
      var n = Up(e)
      return wp(n) && (n = void 0), wp(t) ? Bp(t, yu(e, 1, wp, !0), rp(n)) : []
    }),
    Xp = ts(function (t, e) {
      var n = Up(e)
      return (
        wp(n) && (n = void 0), wp(t) ? Bp(t, yu(e, 1, wp, !0), void 0, n) : []
      )
    }),
    Gp = jo(function (t, e) {
      return t / e
    }, 1)
  function Wp(t, e, n, r) {
    for (
      var o = t.length, i = r ? o : -1;
      (r ? i-- : ++i < o) && e(t[i], i, t);

    );
    return n ? ku(t, r ? 0 : i, r ? i + 1 : o) : ku(t, r ? i + 1 : 0, r ? o : i)
  }
  function Yp(t) {
    return 'function' == typeof t ? t : Jo
  }
  function Fp(t, e) {
    return (No(t) ? Qi : cp)(t, Yp(e))
  }
  function Vp(t, e) {
    for (var n = null == t ? 0 : t.length; n-- && !1 !== e(t[n], n, t); );
    return t
  }
  var Kp = ap(!0)
  function qp(t, e) {
    return t && Kp(t, e, Is)
  }
  var Zp = lp(qp, !0)
  function $p(t, e) {
    return (No(t) ? Vp : Zp)(t, Yp(e))
  }
  function Jp(t) {
    return function (e) {
      var n = xc(e)
      return '[object Map]' == n
        ? yd(e)
        : '[object Set]' == n
        ? (function (t) {
            var e = -1,
              n = Array(t.size)
            return (
              t.forEach(function (t) {
                n[++e] = [t, t]
              }),
              n
            )
          })(e)
        : (function (t, e) {
            return Do(e, function (e) {
              return [e, t[e]]
            })
          })(e, t(e))
    }
  }
  var Qp = Jp(Is),
    th = Jp(Bs),
    eh = ol({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }),
    nh = /[&<>"']/g,
    rh = RegExp(nh.source)
  function oh(t) {
    return (t = au(t)) && rh.test(t) ? t.replace(nh, eh) : t
  }
  var ih = /[\\^$.*+?()[\]{}|]/g,
    ah = RegExp(ih.source)
  function sh(t, e) {
    for (var n = -1, r = null == t ? 0 : t.length; ++n < r; )
      if (!e(t[n], n, t)) return !1
    return !0
  }
  function uh(t, e) {
    var n = !0
    return (
      cp(t, function (t, r, o) {
        return (n = !!e(t, r, o))
      }),
      n
    )
  }
  var lh = 4294967295
  function ch(t) {
    return t ? Wl($o(t), 0, lh) : 0
  }
  function dh(t, e) {
    var n = []
    return (
      cp(t, function (t, r, o) {
        e(t, r, o) && n.push(t)
      }),
      n
    )
  }
  function ph(t) {
    return function (e, n, r) {
      var o = Object(e)
      if (!rs(e)) {
        var i = rp(n)
        ;(e = Is(e)),
          (n = function (t) {
            return i(o[t], t, o)
          })
      }
      var a = t(e, n, r)
      return a > -1 ? o[i ? e[a] : a] : void 0
    }
  }
  var hh = Math.max
  function fh(t, e, n) {
    var r = null == t ? 0 : t.length
    if (!r) return -1
    var o = null == n ? 0 : $o(n)
    return o < 0 && (o = hh(r + o, 0)), ta(t, rp(e), o)
  }
  var vh = ph(fh)
  function yh(t, e, n) {
    var r
    return (
      n(t, function (t, n, o) {
        if (e(t, n, o)) return (r = n), !1
      }),
      r
    )
  }
  var gh = Math.max,
    _h = Math.min
  function mh(t, e, n) {
    var r = null == t ? 0 : t.length
    if (!r) return -1
    var o = r - 1
    return (
      void 0 !== n && ((o = $o(n)), (o = n < 0 ? gh(r + o, 0) : _h(o, r - 1))),
      ta(t, rp(e), o, !0)
    )
  }
  var bh = ph(mh)
  function xh(t) {
    return t && t.length ? t[0] : void 0
  }
  function Eh(t, e) {
    var n = -1,
      r = rs(t) ? Array(t.length) : []
    return (
      cp(t, function (t, o, i) {
        r[++n] = e(t, o, i)
      }),
      r
    )
  }
  function Mh(t, e) {
    return (No(t) ? Do : Eh)(t, rp(e))
  }
  var Th = 1 / 0
  var Sh = 1 / 0
  var wh = zl('floor')
  function Ah(t) {
    return _u(function (e) {
      var n = e.length,
        r = n,
        o = ki.prototype.thru
      for (t && e.reverse(); r--; ) {
        var i = e[r]
        if ('function' != typeof i) throw new TypeError('Expected a function')
        if (o && !a && 'wrapper' == Ri(i)) var a = new ki([], !0)
      }
      for (r = a ? r : n; ++r < n; ) {
        var s = Ri((i = e[r])),
          u = 'wrapper' == s ? Ii(i) : void 0
        a =
          u && Xi(u[0]) && 424 == u[1] && !u[4].length && 1 == u[9]
            ? a[Ri(u[0])].apply(a, u[3])
            : 1 == i.length && Xi(i)
            ? a[s]()
            : a.thru(i)
      }
      return function () {
        var t = arguments,
          r = t[0]
        if (a && 1 == t.length && No(r)) return a.plant(r).value()
        for (var o = 0, i = n ? e[o].apply(this, t) : r; ++o < n; )
          i = e[o].call(this, i)
        return i
      }
    })
  }
  var Oh = Ah(),
    Dh = Ah(!0)
  function Nh(t, e) {
    return Jl(e, function (e) {
      return ri(t[e])
    })
  }
  var Ph = Object.prototype.hasOwnProperty,
    Ch = pp(function (t, e, n) {
      Ph.call(t, n) ? t[n].push(e) : Va(t, n, [e])
    })
  function Ih(t, e) {
    return t > e
  }
  function Lh(t) {
    return function (e, n) {
      return (
        ('string' == typeof e && 'string' == typeof n) ||
          ((e = Vo(e)), (n = Vo(n))),
        t(e, n)
      )
    }
  }
  var jh = Lh(Ih),
    Rh = Lh(function (t, e) {
      return t >= e
    }),
    kh = Object.prototype.hasOwnProperty
  function Bh(t, e) {
    return null != t && kh.call(t, e)
  }
  function zh(t, e) {
    return null != t && Zd(t, e, Bh)
  }
  var Uh = Math.max,
    Hh = Math.min
  var Xh = '[object String]'
  function Gh(t) {
    return 'string' == typeof t || (!No(t) && To(t) && Mo(t) == Xh)
  }
  function Wh(t, e) {
    return Do(e, function (e) {
      return t[e]
    })
  }
  function Yh(t) {
    return null == t ? [] : Wh(t, Is(t))
  }
  var Fh = Math.max
  var Vh = Math.max
  function Kh(t, e, n) {
    var r = null == t ? 0 : t.length
    if (!r) return -1
    var o = null == n ? 0 : $o(n)
    return o < 0 && (o = Vh(r + o, 0)), na(t, e, o)
  }
  var qh = Math.min
  function Zh(t, e, n) {
    for (
      var r = n ? Rp : ra,
        o = t[0].length,
        i = t.length,
        a = i,
        s = Array(i),
        u = 1 / 0,
        l = [];
      a--;

    ) {
      var c = t[a]
      a && e && (c = Do(c, bs(e))),
        (u = qh(c.length, u)),
        (s[a] =
          !n && (e || (o >= 120 && c.length >= 120)) ? new cd(a && c) : void 0)
    }
    c = t[0]
    var d = -1,
      p = s[0]
    t: for (; ++d < o && l.length < u; ) {
      var h = c[d],
        f = e ? e(h) : h
      if (((h = n || 0 !== h ? h : 0), !(p ? pd(p, f) : r(l, f, n)))) {
        for (a = i; --a; ) {
          var v = s[a]
          if (!(v ? pd(v, f) : r(t[a], f, n))) continue t
        }
        p && p.push(f), l.push(h)
      }
    }
    return l
  }
  function $h(t) {
    return wp(t) ? t : []
  }
  var Jh = ts(function (t) {
      var e = Do(t, $h)
      return e.length && e[0] === t[0] ? Zh(e) : []
    }),
    Qh = ts(function (t) {
      var e = Up(t),
        n = Do(t, $h)
      return (
        e === Up(n) ? (e = void 0) : n.pop(),
        n.length && n[0] === t[0] ? Zh(n, rp(e)) : []
      )
    }),
    tf = ts(function (t) {
      var e = Up(t),
        n = Do(t, $h)
      return (
        (e = 'function' == typeof e ? e : void 0) && n.pop(),
        n.length && n[0] === t[0] ? Zh(n, void 0, e) : []
      )
    })
  function ef(t, e) {
    return function (n, r) {
      return (function (t, e, n, r) {
        return (
          up(t, function (t, o, i) {
            e(r, n(t), o, i)
          }),
          r
        )
      })(n, t, e(r), {})
    }
  }
  var nf = Object.prototype.toString,
    rf = ef(function (t, e, n) {
      null != e && 'function' != typeof e.toString && (e = nf.call(e)),
        (t[e] = n)
    }, qi(Jo)),
    of = Object.prototype,
    af = of.hasOwnProperty,
    sf = of.toString,
    uf = ef(function (t, e, n) {
      null != e && 'function' != typeof e.toString && (e = sf.call(e)),
        af.call(t, e) ? t[e].push(n) : (t[e] = [n])
    }, rp)
  function lf(t, e) {
    return e.length < 2 ? t : cu(t, ku(e, 0, -1))
  }
  function cf(t, e, n) {
    var r = null == (t = lf(t, (e = su(e, t)))) ? t : t[lu(Up(e))]
    return null == r ? void 0 : Ti(r, t, n)
  }
  var df = ts(cf),
    pf = ts(function (t, e, n) {
      var r = -1,
        o = 'function' == typeof e,
        i = rs(t) ? Array(t.length) : []
      return (
        cp(t, function (t) {
          i[++r] = o ? Ti(e, t, n) : cf(t, e, n)
        }),
        i
      )
    })
  var hf = Ts && Ts.isArrayBuffer,
    ff = hf
      ? bs(hf)
      : function (t) {
          return To(t) && '[object ArrayBuffer]' == Mo(t)
        }
  function vf(t) {
    return !0 === t || !1 === t || (To(t) && '[object Boolean]' == Mo(t))
  }
  var yf = Ts && Ts.isDate,
    gf = yf
      ? bs(yf)
      : function (t) {
          return To(t) && '[object Date]' == Mo(t)
        }
  var _f = '[object Map]',
    mf = '[object Set]',
    bf = Object.prototype.hasOwnProperty
  function xf(t) {
    if (null == t) return !0
    if (
      rs(t) &&
      (No(t) ||
        'string' == typeof t ||
        'function' == typeof t.splice ||
        _s(t) ||
        ws(t) ||
        hs(t))
    )
      return !t.length
    var e = xc(t)
    if (e == _f || e == mf) return !t.size
    if (ss(t)) return !Cs(t).length
    for (var n in t) if (bf.call(t, n)) return !1
    return !0
  }
  function Ef(t, e) {
    return Hd(t, e)
  }
  var Mf = ho.isFinite
  function Tf(t) {
    return 'number' == typeof t && t == $o(t)
  }
  var Sf = '[object Number]'
  function wf(t) {
    return 'number' == typeof t || (To(t) && Mo(t) == Sf)
  }
  var Af = ii ? ri : fs
  function Of(t) {
    return null == t
  }
  var Df = Ts && Ts.isRegExp,
    Nf = Df
      ? bs(Df)
      : function (t) {
          return To(t) && '[object RegExp]' == Mo(t)
        },
    Pf = 9007199254740991
  function Cf(t) {
    return void 0 === t
  }
  var If = Array.prototype.join
  var Lf = jl(function (t, e, n) {
      return t + (n ? '-' : '') + e.toLowerCase()
    }),
    jf = pp(function (t, e, n) {
      Va(t, n, e)
    })
  var Rf = Math.max,
    kf = Math.min
  var Bf = jl(function (t, e, n) {
      return t + (n ? ' ' : '') + e.toLowerCase()
    }),
    zf = tl('toLowerCase')
  function Uf(t, e) {
    return t < e
  }
  var Hf = Lh(Uf),
    Xf = Lh(function (t, e) {
      return t <= e
    })
  function Gf(t, e) {
    var n = {}
    return (
      (e = rp(e)),
      up(t, function (t, r, o) {
        Va(n, e(t, r, o), t)
      }),
      n
    )
  }
  function Wf(t, e, n) {
    for (var r = -1, o = t.length; ++r < o; ) {
      var i = t[r],
        a = e(i)
      if (null != a && (void 0 === s ? a == a && !wo(a) : n(a, s)))
        var s = a,
          u = i
    }
    return u
  }
  function Yf(t, e) {
    for (var n, r = -1, o = t.length; ++r < o; ) {
      var i = e(t[r])
      void 0 !== i && (n = void 0 === n ? i : n + i)
    }
    return n
  }
  var Ff = NaN
  function Vf(t, e) {
    var n = null == t ? 0 : t.length
    return n ? Yf(t, e) / n : Ff
  }
  var Kf = is(function (t, e, n) {
      Dp(t, e, n)
    }),
    qf = ts(function (t, e) {
      return function (n) {
        return cf(n, t, e)
      }
    }),
    Zf = ts(function (t, e) {
      return function (n) {
        return cf(t, n, e)
      }
    })
  function $f(t, e, n) {
    var r = Is(e),
      o = Nh(e, r),
      i = !(Ho(n) && 'chain' in n && !n.chain),
      a = ri(t)
    return (
      Qi(o, function (n) {
        var r = e[n]
        ;(t[n] = r),
          a &&
            (t.prototype[n] = function () {
              var e = this.__chain__
              if (i || e) {
                var n = t(this.__wrapped__)
                return (
                  (n.__actions__ = Bi(this.__actions__)).push({
                    func: r,
                    args: arguments,
                    thisArg: t
                  }),
                  (n.__chain__ = e),
                  n
                )
              }
              return r.apply(t, hu([this.value()], arguments))
            })
      }),
      t
    )
  }
  var Jf = jo(function (t, e) {
      return t * e
    }, 1),
    Qf = 'Expected a function'
  function tv(t) {
    if ('function' != typeof t) throw new TypeError(Qf)
    return function () {
      var e = arguments
      switch (e.length) {
        case 0:
          return !t.call(this)
        case 1:
          return !t.call(this, e[0])
        case 2:
          return !t.call(this, e[0], e[1])
        case 3:
          return !t.call(this, e[0], e[1], e[2])
      }
      return !t.apply(this, e)
    }
  }
  var ev = '[object Map]',
    nv = '[object Set]',
    rv = fo ? fo.iterator : void 0
  function ov(t) {
    if (!t) return []
    if (rs(t)) return Gh(t) ? Qu(t) : Bi(t)
    if (rv && t[rv])
      return (function (t) {
        for (var e, n = []; !(e = t.next()).done; ) n.push(e.value)
        return n
      })(t[rv]())
    var e = xc(t)
    return (e == ev ? yd : e == nv ? gd : Yh)(t)
  }
  function iv(t, e) {
    var n = t.length
    if (n) return ya((e += e < 0 ? n : 0), n) ? t[e] : void 0
  }
  function av(t, e) {
    return null == (t = lf(t, (e = su(e, t)))) || delete t[lu(Up(e))]
  }
  function sv(t) {
    return Au(t) ? void 0 : t
  }
  var uv = _u(function (t, e) {
    var n = {}
    if (null == t) return n
    var r = !1
    ;(e = Do(e, function (e) {
      return (e = su(e, t)), r || (r = e.length > 1), e
    })),
      $a(t, ac(t), n),
      r && (n = ud(n, 7, sv))
    for (var o = e.length; o--; ) av(n, e[o])
    return n
  })
  function lv(t, e, n, r) {
    if (!Ho(t)) return t
    for (
      var o = -1, i = (e = su(e, t)).length, a = i - 1, s = t;
      null != s && ++o < i;

    ) {
      var u = lu(e[o]),
        l = n
      if ('__proto__' === u || 'constructor' === u || 'prototype' === u)
        return t
      if (o != a) {
        var c = s[u]
        void 0 === (l = r ? r(c, u, s) : void 0) &&
          (l = Ho(c) ? c : ya(e[o + 1]) ? [] : {})
      }
      Za(s, u, l), (s = s[u])
    }
    return t
  }
  function cv(t, e, n) {
    for (var r = -1, o = e.length, i = {}; ++r < o; ) {
      var a = e[r],
        s = cu(t, a)
      n(s, a) && lv(i, su(a, t), s)
    }
    return i
  }
  function dv(t, e) {
    if (null == t) return {}
    var n = Do(ac(t), function (t) {
      return [t]
    })
    return (
      (e = rp(e)),
      cv(t, n, function (t, n) {
        return e(t, n[0])
      })
    )
  }
  function pv(t, e) {
    if (t !== e) {
      var n = void 0 !== t,
        r = null === t,
        o = t == t,
        i = wo(t),
        a = void 0 !== e,
        s = null === e,
        u = e == e,
        l = wo(e)
      if (
        (!s && !l && !i && t > e) ||
        (i && a && u && !s && !l) ||
        (r && a && u) ||
        (!n && u) ||
        !o
      )
        return 1
      if (
        (!r && !i && !l && t < e) ||
        (l && n && o && !r && !i) ||
        (s && n && o) ||
        (!a && o) ||
        !u
      )
        return -1
    }
    return 0
  }
  function hv(t, e, n) {
    e = e.length
      ? Do(e, function (t) {
          return No(t)
            ? function (e) {
                return cu(e, 1 === t.length ? t[0] : t)
              }
            : t
        })
      : [Jo]
    var r = -1
    e = Do(e, bs(rp))
    var o = Eh(t, function (t, n, o) {
      var i = Do(e, function (e) {
        return e(t)
      })
      return { criteria: i, index: ++r, value: t }
    })
    return (function (t, e) {
      var n = t.length
      for (t.sort(e); n--; ) t[n] = t[n].value
      return t
    })(o, function (t, e) {
      return (function (t, e, n) {
        for (
          var r = -1,
            o = t.criteria,
            i = e.criteria,
            a = o.length,
            s = n.length;
          ++r < a;

        ) {
          var u = pv(o[r], i[r])
          if (u) return r >= s ? u : u * ('desc' == n[r] ? -1 : 1)
        }
        return t.index - e.index
      })(t, e, n)
    })
  }
  function fv(t) {
    return _u(function (e) {
      return (
        (e = Do(e, bs(rp))),
        ts(function (n) {
          var r = this
          return t(e, function (t) {
            return Ti(t, r, n)
          })
        })
      )
    })
  }
  var vv = fv(Do),
    yv = ts,
    gv = Math.min,
    _v = yv(function (t, e) {
      var n = (e =
        1 == e.length && No(e[0]) ? Do(e[0], bs(rp)) : Do(yu(e, 1), bs(rp)))
        .length
      return ts(function (r) {
        for (var o = -1, i = gv(r.length, n); ++o < i; )
          r[o] = e[o].call(this, r[o])
        return Ti(t, this, r)
      })
    }),
    mv = fv(sh),
    bv = fv(dd),
    xv = 9007199254740991,
    Ev = Math.floor
  function Mv(t, e) {
    var n = ''
    if (!t || e < 1 || e > xv) return n
    do {
      e % 2 && (n += t), (e = Ev(e / 2)) && (t += t)
    } while (e)
    return n
  }
  var Tv = ep('length'),
    Sv = '\\ud800-\\udfff',
    wv = '[' + Sv + ']',
    Av = '[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]',
    Ov = '\\ud83c[\\udffb-\\udfff]',
    Dv = '[^' + Sv + ']',
    Nv = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    Pv = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    Cv = '(?:' + Av + '|' + Ov + ')' + '?',
    Iv = '[\\ufe0e\\ufe0f]?',
    Lv =
      Iv +
      Cv +
      ('(?:\\u200d(?:' + [Dv, Nv, Pv].join('|') + ')' + Iv + Cv + ')*'),
    jv = '(?:' + [Dv + Av + '?', Av, Nv, Pv, wv].join('|') + ')',
    Rv = RegExp(Ov + '(?=' + Ov + ')|' + jv + Lv, 'g')
  function kv(t) {
    return Uu(t)
      ? (function (t) {
          for (var e = (Rv.lastIndex = 0); Rv.test(t); ) ++e
          return e
        })(t)
      : Tv(t)
  }
  var Bv = Math.ceil
  function zv(t, e) {
    var n = (e = void 0 === e ? ' ' : Lo(e)).length
    if (n < 2) return n ? Mv(e, t) : e
    var r = Mv(e, Bv(t / kv(e)))
    return Uu(e) ? Bu(Qu(r), 0, t).join('') : r.slice(0, t)
  }
  var Uv = Math.ceil,
    Hv = Math.floor
  var Xv = /^\s+/,
    Gv = ho.parseInt
  var Wv = ts(function (t, e) {
    return Wa(t, 32, void 0, e, ma(e, ha(Wv)))
  })
  Wv.placeholder = {}
  var Yv = ts(function (t, e) {
    return Wa(t, 64, void 0, e, ma(e, ha(Yv)))
  })
  Yv.placeholder = {}
  var Fv = pp(
    function (t, e, n) {
      t[n ? 0 : 1].push(e)
    },
    function () {
      return [[], []]
    }
  )
  var Vv = _u(function (t, e) {
    return null == t
      ? {}
      : (function (t, e) {
          return cv(t, e, function (e, n) {
            return $d(t, n)
          })
        })(t, e)
  })
  function Kv(t, e, n, r) {
    for (var o = n - 1, i = t.length; ++o < i; ) if (r(t[o], e)) return o
    return -1
  }
  var qv = Array.prototype.splice
  function Zv(t, e, n, r) {
    var o = r ? Kv : na,
      i = -1,
      a = e.length,
      s = t
    for (t === e && (e = Bi(e)), n && (s = Do(t, bs(n))); ++i < a; )
      for (var u = 0, l = e[i], c = n ? n(l) : l; (u = o(s, c, u, r)) > -1; )
        s !== t && qv.call(s, u, 1), qv.call(t, u, 1)
    return t
  }
  function $v(t, e) {
    return t && t.length && e && e.length ? Zv(t, e) : t
  }
  var Jv = ts($v)
  var Qv = Array.prototype.splice
  function ty(t, e) {
    for (var n = t ? e.length : 0, r = n - 1; n--; ) {
      var o = e[n]
      if (n == r || o !== i) {
        var i = o
        ya(o) ? Qv.call(t, o, 1) : av(t, o)
      }
    }
    return t
  }
  var ey = _u(function (t, e) {
      var n = null == t ? 0 : t.length,
        r = pu(t, e)
      return (
        ty(
          t,
          Do(e, function (t) {
            return ya(t, n) ? +t : t
          }).sort(pv)
        ),
        r
      )
    }),
    ny = Math.floor,
    ry = Math.random
  function oy(t, e) {
    return t + ny(ry() * (e - t + 1))
  }
  var iy = parseFloat,
    ay = Math.min,
    sy = Math.random
  var uy = Math.ceil,
    ly = Math.max
  function cy(t) {
    return function (e, n, r) {
      return (
        r && 'number' != typeof r && os(e, n, r) && (n = r = void 0),
        (e = Zo(e)),
        void 0 === n ? ((n = e), (e = 0)) : (n = Zo(n)),
        (function (t, e, n, r) {
          for (
            var o = -1, i = ly(uy((e - t) / (n || 1)), 0), a = Array(i);
            i--;

          )
            (a[r ? i : ++o] = t), (t += n)
          return a
        })(e, n, (r = void 0 === r ? (e < n ? 1 : -1) : Zo(r)), t)
      )
    }
  }
  var dy = cy(),
    py = cy(!0),
    hy = _u(function (t, e) {
      return Wa(t, 256, void 0, void 0, void 0, e)
    })
  function fy(t, e, n, r, o) {
    return (
      o(t, function (t, o, i) {
        n = r ? ((r = !1), t) : e(n, t, o, i)
      }),
      n
    )
  }
  function vy(t, e, n) {
    var r = No(t) ? rl : fy,
      o = arguments.length < 3
    return r(t, rp(e), n, o, cp)
  }
  function yy(t, e, n, r) {
    var o = null == t ? 0 : t.length
    for (r && o && (n = t[--o]); o--; ) n = e(n, t[o], o, t)
    return n
  }
  var gy = Array.prototype.reverse
  function _y(t) {
    return null == t ? t : gy.call(t)
  }
  var my = zl('round')
  function by(t) {
    var e = t.length
    return e ? t[oy(0, e - 1)] : void 0
  }
  function xy(t) {
    return by(Yh(t))
  }
  function Ey(t, e) {
    var n = -1,
      r = t.length,
      o = r - 1
    for (e = void 0 === e ? r : e; ++n < e; ) {
      var i = oy(n, o),
        a = t[i]
      ;(t[i] = t[n]), (t[n] = a)
    }
    return (t.length = e), t
  }
  function My(t, e) {
    return Ey(Bi(t), Wl(e, 0, t.length))
  }
  function Ty(t, e) {
    var n = Yh(t)
    return Ey(n, Wl(e, 0, n.length))
  }
  function Sy(t, e, n) {
    return null == t ? t : lv(t, e, n)
  }
  function wy(t) {
    return Ey(Bi(t))
  }
  function Ay(t) {
    return Ey(Yh(t))
  }
  var Oy = jl(function (t, e, n) {
    return t + (n ? '_' : '') + e.toLowerCase()
  })
  function Dy(t, e) {
    var n
    return (
      cp(t, function (t, r, o) {
        return !(n = e(t, r, o))
      }),
      !!n
    )
  }
  var Ny = ts(function (t, e) {
      if (null == t) return []
      var n = e.length
      return (
        n > 1 && os(t, e[0], e[1])
          ? (e = [])
          : n > 2 && os(e[0], e[1], e[2]) && (e = [e[0]]),
        hv(t, yu(e, 1), [])
      )
    }),
    Py = 4294967294,
    Cy = Math.floor,
    Iy = Math.min
  function Ly(t, e, n, r) {
    var o = 0,
      i = null == t ? 0 : t.length
    if (0 === i) return 0
    for (
      var a = (e = n(e)) != e, s = null === e, u = wo(e), l = void 0 === e;
      o < i;

    ) {
      var c = Cy((o + i) / 2),
        d = n(t[c]),
        p = void 0 !== d,
        h = null === d,
        f = d == d,
        v = wo(d)
      if (a) var y = r || f
      else
        y = l
          ? f && (r || p)
          : s
          ? f && p && (r || !h)
          : u
          ? f && p && !h && (r || !v)
          : !h && !v && (r ? d <= e : d < e)
      y ? (o = c + 1) : (i = c)
    }
    return Iy(i, Py)
  }
  var jy = 2147483647
  function Ry(t, e, n) {
    var r = 0,
      o = null == t ? r : t.length
    if ('number' == typeof e && e == e && o <= jy) {
      for (; r < o; ) {
        var i = (r + o) >>> 1,
          a = t[i]
        null !== a && !wo(a) && (n ? a <= e : a < e) ? (r = i + 1) : (o = i)
      }
      return o
    }
    return Ly(t, e, Jo, n)
  }
  function ky(t, e) {
    for (var n = -1, r = t.length, o = 0, i = []; ++n < r; ) {
      var a = t[n],
        s = e ? e(a) : a
      if (!n || !Ka(s, u)) {
        var u = s
        i[o++] = 0 === a ? 0 : a
      }
    }
    return i
  }
  var By = Math.max
  var zy = jl(function (t, e, n) {
    return t + (n ? ' ' : '') + el(e)
  })
  var Uy = jo(function (t, e) {
    return t - e
  }, 0)
  var Hy = Object.prototype,
    Xy = Hy.hasOwnProperty
  function Gy(t, e, n, r) {
    return void 0 === t || (Ka(t, Hy[n]) && !Xy.call(r, n)) ? e : t
  }
  var Wy = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  }
  function Yy(t) {
    return '\\' + Wy[t]
  }
  var Fy = /<%=([\s\S]+?)%>/g,
    Vy = {
      escape: /<%-([\s\S]+?)%>/g,
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: Fy,
      variable: '',
      imports: { _: { escape: oh } }
    },
    Ky = /\b__p \+= '';/g,
    qy = /\b(__p \+=) '' \+/g,
    Zy = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
    $y = /[()=,{}\[\]\/\s]/,
    Jy = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
    Qy = /($^)/,
    tg = /['\n\r\u2028\u2029\\]/g,
    eg = Object.prototype.hasOwnProperty
  function ng(t, e, n) {
    var r = !0,
      o = !0
    if ('function' != typeof t) throw new TypeError('Expected a function')
    return (
      Ho(n) &&
        ((r = 'leading' in n ? !!n.leading : r),
        (o = 'trailing' in n ? !!n.trailing : o)),
      xp(t, e, { leading: r, maxWait: e, trailing: o })
    )
  }
  function rg(t, e) {
    return e(t)
  }
  var og = 4294967295,
    ig = Math.min
  function ag(t, e) {
    var n = t
    return (
      n instanceof Pi && (n = n.value()),
      rl(
        e,
        function (t, e) {
          return e.func.apply(e.thisArg, hu([t], e.args))
        },
        n
      )
    )
  }
  function sg() {
    return ag(this.__wrapped__, this.__actions__)
  }
  var ug = 9007199254740991
  function lg(t, e) {
    for (var n = t.length; n-- && na(e, t[n], 0) > -1; );
    return n
  }
  function cg(t, e) {
    for (var n = -1, r = t.length; ++n < r && na(e, t[n], 0) > -1; );
    return n
  }
  var dg = /^\s+/
  var pg = /\w*$/
  var hg = ol({
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'"
    }),
    fg = /&(?:amp|lt|gt|quot|#39);/g,
    vg = RegExp(fg.source)
  var yg =
      lc && 1 / gd(new lc([, -0]))[1] == 1 / 0
        ? function (t) {
            return new lc(t)
          }
        : Ci,
    gg = 200
  function _g(t, e, n) {
    var r = -1,
      o = ra,
      i = t.length,
      a = !0,
      s = [],
      u = s
    if (n) (a = !1), (o = Rp)
    else if (i >= gg) {
      var l = e ? null : yg(t)
      if (l) return gd(l)
      ;(a = !1), (o = pd), (u = new cd())
    } else u = e ? [] : s
    t: for (; ++r < i; ) {
      var c = t[r],
        d = e ? e(c) : c
      if (((c = n || 0 !== c ? c : 0), a && d == d)) {
        for (var p = u.length; p--; ) if (u[p] === d) continue t
        e && u.push(d), s.push(c)
      } else o(u, d, n) || (u !== s && u.push(d), s.push(c))
    }
    return s
  }
  var mg = ts(function (t) {
      return _g(yu(t, 1, wp, !0))
    }),
    bg = ts(function (t) {
      var e = Up(t)
      return wp(e) && (e = void 0), _g(yu(t, 1, wp, !0), rp(e))
    }),
    xg = ts(function (t) {
      var e = Up(t)
      return (
        (e = 'function' == typeof e ? e : void 0),
        _g(yu(t, 1, wp, !0), void 0, e)
      )
    })
  var Eg = 0
  var Mg = Math.max
  function Tg(t) {
    if (!t || !t.length) return []
    var e = 0
    return (
      (t = Jl(t, function (t) {
        if (wp(t)) return (e = Mg(t.length, e)), !0
      })),
      us(e, function (e) {
        return Do(t, ep(e))
      })
    )
  }
  function Sg(t, e) {
    if (!t || !t.length) return []
    var n = Tg(t)
    return null == e
      ? n
      : Do(n, function (t) {
          return Ti(e, void 0, t)
        })
  }
  function wg(t, e, n, r) {
    return lv(t, e, n(cu(t, e)), r)
  }
  var Ag = jl(function (t, e, n) {
    return t + (n ? ' ' : '') + e.toUpperCase()
  })
  var Og = ts(function (t, e) {
    return wp(t) ? Bp(t, e) : []
  })
  var Dg = _u(function (t) {
    var e = t.length,
      n = e ? t[0] : 0,
      r = this.__wrapped__,
      o = function (e) {
        return pu(e, t)
      }
    return !(e > 1 || this.__actions__.length) && r instanceof Pi && ya(n)
      ? ((r = r.slice(n, +n + (e ? 1 : 0))).__actions__.push({
          func: rg,
          args: [o],
          thisArg: void 0
        }),
        new ki(r, this.__chain__).thru(function (t) {
          return e && !t.length && t.push(void 0), t
        }))
      : this.thru(o)
  })
  function Ng(t, e, n) {
    var r = t.length
    if (r < 2) return r ? _g(t[0]) : []
    for (var o = -1, i = Array(r); ++o < r; )
      for (var a = t[o], s = -1; ++s < r; )
        s != o && (i[o] = Bp(i[o] || a, t[s], e, n))
    return _g(yu(i, 1), e, n)
  }
  var Pg = ts(function (t) {
      return Ng(Jl(t, wp))
    }),
    Cg = ts(function (t) {
      var e = Up(t)
      return wp(e) && (e = void 0), Ng(Jl(t, wp), rp(e))
    }),
    Ig = ts(function (t) {
      var e = Up(t)
      return (e = 'function' == typeof e ? e : void 0), Ng(Jl(t, wp), void 0, e)
    }),
    Lg = ts(Tg)
  function jg(t, e, n) {
    for (var r = -1, o = t.length, i = e.length, a = {}; ++r < o; ) {
      var s = r < i ? e[r] : void 0
      n(a, t[r], s)
    }
    return a
  }
  var Rg = ts(function (t) {
      var e = t.length,
        n = e > 1 ? t[e - 1] : void 0
      return (n = 'function' == typeof n ? (t.pop(), n) : void 0), Sg(t, n)
    }),
    kg = {
      chunk: function (t, e, n) {
        e = (n ? os(t, e, n) : void 0 === e) ? 1 : Gl($o(e), 0)
        var r = null == t ? 0 : t.length
        if (!r || e < 1) return []
        for (var o = 0, i = 0, a = Array(Xl(r / e)); o < r; )
          a[i++] = ku(t, o, (o += e))
        return a
      },
      compact: function (t) {
        for (
          var e = -1, n = null == t ? 0 : t.length, r = 0, o = [];
          ++e < n;

        ) {
          var i = t[e]
          i && (o[r++] = i)
        }
        return o
      },
      concat: function () {
        var t = arguments.length
        if (!t) return []
        for (var e = Array(t - 1), n = arguments[0], r = t; r--; )
          e[r - 1] = arguments[r]
        return hu(No(n) ? Bi(n) : [n], yu(e, 1))
      },
      difference: zp,
      differenceBy: Hp,
      differenceWith: Xp,
      drop: function (t, e, n) {
        var r = null == t ? 0 : t.length
        return r
          ? ku(t, (e = n || void 0 === e ? 1 : $o(e)) < 0 ? 0 : e, r)
          : []
      },
      dropRight: function (t, e, n) {
        var r = null == t ? 0 : t.length
        return r
          ? ku(t, 0, (e = r - (e = n || void 0 === e ? 1 : $o(e))) < 0 ? 0 : e)
          : []
      },
      dropRightWhile: function (t, e) {
        return t && t.length ? Wp(t, rp(e), !0, !0) : []
      },
      dropWhile: function (t, e) {
        return t && t.length ? Wp(t, rp(e), !0) : []
      },
      fill: function (t, e, n, r) {
        var o = null == t ? 0 : t.length
        return o
          ? (n && 'number' != typeof n && os(t, e, n) && ((n = 0), (r = o)),
            (function (t, e, n, r) {
              var o = t.length
              for (
                (n = $o(n)) < 0 && (n = -n > o ? 0 : o + n),
                  (r = void 0 === r || r > o ? o : $o(r)) < 0 && (r += o),
                  r = n > r ? 0 : ch(r);
                n < r;

              )
                t[n++] = e
              return t
            })(t, e, n, r))
          : []
      },
      findIndex: fh,
      findLastIndex: mh,
      first: xh,
      flatten: gu,
      flattenDeep: function (t) {
        return (null == t ? 0 : t.length) ? yu(t, Sh) : []
      },
      flattenDepth: function (t, e) {
        return (null == t ? 0 : t.length)
          ? yu(t, (e = void 0 === e ? 1 : $o(e)))
          : []
      },
      fromPairs: function (t) {
        for (var e = -1, n = null == t ? 0 : t.length, r = {}; ++e < n; ) {
          var o = t[e]
          r[o[0]] = o[1]
        }
        return r
      },
      head: xh,
      indexOf: Kh,
      initial: function (t) {
        return (null == t ? 0 : t.length) ? ku(t, 0, -1) : []
      },
      intersection: Jh,
      intersectionBy: Qh,
      intersectionWith: tf,
      join: function (t, e) {
        return null == t ? '' : If.call(t, e)
      },
      last: Up,
      lastIndexOf: function (t, e, n) {
        var r = null == t ? 0 : t.length
        if (!r) return -1
        var o = r
        return (
          void 0 !== n && (o = (o = $o(n)) < 0 ? Rf(r + o, 0) : kf(o, r - 1)),
          e == e
            ? (function (t, e, n) {
                for (var r = n + 1; r--; ) if (t[r] === e) return r
                return r
              })(t, e, o)
            : ta(t, ea, o, !0)
        )
      },
      nth: function (t, e) {
        return t && t.length ? iv(t, $o(e)) : void 0
      },
      pull: Jv,
      pullAll: $v,
      pullAllBy: function (t, e, n) {
        return t && t.length && e && e.length ? Zv(t, e, rp(n)) : t
      },
      pullAllWith: function (t, e, n) {
        return t && t.length && e && e.length ? Zv(t, e, void 0, n) : t
      },
      pullAt: ey,
      remove: function (t, e) {
        var n = []
        if (!t || !t.length) return n
        var r = -1,
          o = [],
          i = t.length
        for (e = rp(e); ++r < i; ) {
          var a = t[r]
          e(a, r, t) && (n.push(a), o.push(r))
        }
        return ty(t, o), n
      },
      reverse: _y,
      slice: function (t, e, n) {
        var r = null == t ? 0 : t.length
        return r
          ? (n && 'number' != typeof n && os(t, e, n)
              ? ((e = 0), (n = r))
              : ((e = null == e ? 0 : $o(e)), (n = void 0 === n ? r : $o(n))),
            ku(t, e, n))
          : []
      },
      sortedIndex: function (t, e) {
        return Ry(t, e)
      },
      sortedIndexBy: function (t, e, n) {
        return Ly(t, e, rp(n))
      },
      sortedIndexOf: function (t, e) {
        var n = null == t ? 0 : t.length
        if (n) {
          var r = Ry(t, e)
          if (r < n && Ka(t[r], e)) return r
        }
        return -1
      },
      sortedLastIndex: function (t, e) {
        return Ry(t, e, !0)
      },
      sortedLastIndexBy: function (t, e, n) {
        return Ly(t, e, rp(n), !0)
      },
      sortedLastIndexOf: function (t, e) {
        if (null == t ? 0 : t.length) {
          var n = Ry(t, e, !0) - 1
          if (Ka(t[n], e)) return n
        }
        return -1
      },
      sortedUniq: function (t) {
        return t && t.length ? ky(t) : []
      },
      sortedUniqBy: function (t, e) {
        return t && t.length ? ky(t, rp(e)) : []
      },
      tail: function (t) {
        var e = null == t ? 0 : t.length
        return e ? ku(t, 1, e) : []
      },
      take: function (t, e, n) {
        return t && t.length
          ? ku(t, 0, (e = n || void 0 === e ? 1 : $o(e)) < 0 ? 0 : e)
          : []
      },
      takeRight: function (t, e, n) {
        var r = null == t ? 0 : t.length
        return r
          ? ku(t, (e = r - (e = n || void 0 === e ? 1 : $o(e))) < 0 ? 0 : e, r)
          : []
      },
      takeRightWhile: function (t, e) {
        return t && t.length ? Wp(t, rp(e), !1, !0) : []
      },
      takeWhile: function (t, e) {
        return t && t.length ? Wp(t, rp(e)) : []
      },
      union: mg,
      unionBy: bg,
      unionWith: xg,
      uniq: function (t) {
        return t && t.length ? _g(t) : []
      },
      uniqBy: function (t, e) {
        return t && t.length ? _g(t, rp(e)) : []
      },
      uniqWith: function (t, e) {
        return (
          (e = 'function' == typeof e ? e : void 0),
          t && t.length ? _g(t, void 0, e) : []
        )
      },
      unzip: Tg,
      unzipWith: Sg,
      without: Og,
      xor: Pg,
      xorBy: Cg,
      xorWith: Ig,
      zip: Lg,
      zipObject: function (t, e) {
        return jg(t || [], e || [], Za)
      },
      zipObjectDeep: function (t, e) {
        return jg(t || [], e || [], lv)
      },
      zipWith: Rg
    },
    Bg = {
      countBy: fp,
      each: Fp,
      eachRight: $p,
      every: function (t, e, n) {
        var r = No(t) ? sh : uh
        return n && os(t, e, n) && (e = void 0), r(t, rp(e))
      },
      filter: function (t, e) {
        return (No(t) ? Jl : dh)(t, rp(e))
      },
      find: vh,
      findLast: bh,
      flatMap: function (t, e) {
        return yu(Mh(t, e), 1)
      },
      flatMapDeep: function (t, e) {
        return yu(Mh(t, e), Th)
      },
      flatMapDepth: function (t, e, n) {
        return (n = void 0 === n ? 1 : $o(n)), yu(Mh(t, e), n)
      },
      forEach: Fp,
      forEachRight: $p,
      groupBy: Ch,
      includes: function (t, e, n, r) {
        ;(t = rs(t) ? t : Yh(t)), (n = n && !r ? $o(n) : 0)
        var o = t.length
        return (
          n < 0 && (n = Fh(o + n, 0)),
          Gh(t) ? n <= o && t.indexOf(e, n) > -1 : !!o && na(t, e, n) > -1
        )
      },
      invokeMap: pf,
      keyBy: jf,
      map: Mh,
      orderBy: function (t, e, n, r) {
        return null == t
          ? []
          : (No(e) || (e = null == e ? [] : [e]),
            No((n = r ? void 0 : n)) || (n = null == n ? [] : [n]),
            hv(t, e, n))
      },
      partition: Fv,
      reduce: vy,
      reduceRight: function (t, e, n) {
        var r = No(t) ? yy : fy,
          o = arguments.length < 3
        return r(t, rp(e), n, o, Zp)
      },
      reject: function (t, e) {
        return (No(t) ? Jl : dh)(t, tv(rp(e)))
      },
      sample: function (t) {
        return (No(t) ? by : xy)(t)
      },
      sampleSize: function (t, e, n) {
        return (
          (e = (n ? os(t, e, n) : void 0 === e) ? 1 : $o(e)),
          (No(t) ? My : Ty)(t, e)
        )
      },
      shuffle: function (t) {
        return (No(t) ? wy : Ay)(t)
      },
      size: function (t) {
        if (null == t) return 0
        if (rs(t)) return Gh(t) ? kv(t) : t.length
        var e = xc(t)
        return '[object Map]' == e || '[object Set]' == e
          ? t.size
          : Cs(t).length
      },
      some: function (t, e, n) {
        var r = No(t) ? dd : Dy
        return n && os(t, e, n) && (e = void 0), r(t, rp(e))
      },
      sortBy: Ny
    },
    zg = gp,
    Ug = {
      after: function (t, e) {
        if ('function' != typeof e) throw new TypeError('Expected a function')
        return (
          (t = $o(t)),
          function () {
            if (--t < 1) return e.apply(this, arguments)
          }
        )
      },
      ary: Fa,
      before: Iu,
      bind: Lu,
      bindKey: Ru,
      curry: vp,
      curryRight: yp,
      debounce: xp,
      defer: Lp,
      delay: jp,
      flip: function (t) {
        return Wa(t, 512)
      },
      memoize: nu,
      negate: tv,
      once: function (t) {
        return Iu(2, t)
      },
      overArgs: _v,
      partial: Wv,
      partialRight: Yv,
      rearg: hy,
      rest: function (t, e) {
        if ('function' != typeof t) throw new TypeError('Expected a function')
        return ts(t, (e = void 0 === e ? e : $o(e)))
      },
      spread: function (t, e) {
        if ('function' != typeof t) throw new TypeError('Expected a function')
        return (
          (e = null == e ? 0 : By($o(e), 0)),
          ts(function (n) {
            var r = n[e],
              o = Bu(n, 0, e)
            return r && hu(o, r), Ti(t, this, o)
          })
        )
      },
      throttle: ng,
      unary: function (t) {
        return Fa(t, 1)
      },
      wrap: function (t, e) {
        return Wv(Yp(e), t)
      }
    },
    Hg = {
      castArray: function () {
        if (!arguments.length) return []
        var t = arguments[0]
        return No(t) ? t : [t]
      },
      clone: function (t) {
        return ud(t, 4)
      },
      cloneDeep: ld,
      cloneDeepWith: function (t, e) {
        return ud(t, 5, (e = 'function' == typeof e ? e : void 0))
      },
      cloneWith: function (t, e) {
        return ud(t, 4, (e = 'function' == typeof e ? e : void 0))
      },
      conformsTo: function (t, e) {
        return null == e || op(t, e, Is(e))
      },
      eq: Ka,
      gt: jh,
      gte: Rh,
      isArguments: hs,
      isArray: No,
      isArrayBuffer: ff,
      isArrayLike: rs,
      isArrayLikeObject: wp,
      isBoolean: vf,
      isBuffer: _s,
      isDate: gf,
      isElement: function (t) {
        return To(t) && 1 === t.nodeType && !Au(t)
      },
      isEmpty: xf,
      isEqual: Ef,
      isEqualWith: function (t, e, n) {
        var r = (n = 'function' == typeof n ? n : void 0) ? n(t, e) : void 0
        return void 0 === r ? Hd(t, e, void 0, n) : !!r
      },
      isError: Nu,
      isFinite: function (t) {
        return 'number' == typeof t && Mf(t)
      },
      isFunction: ri,
      isInteger: Tf,
      isLength: ns,
      isMap: $c,
      isMatch: function (t, e) {
        return t === e || Wd(t, e, Fd(e))
      },
      isMatchWith: function (t, e, n) {
        return (n = 'function' == typeof n ? n : void 0), Wd(t, e, Fd(e), n)
      },
      isNaN: function (t) {
        return wf(t) && t != +t
      },
      isNative: function (t) {
        if (Af(t))
          throw new Error(
            'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.'
          )
        return vi(t)
      },
      isNil: Of,
      isNull: function (t) {
        return null === t
      },
      isNumber: wf,
      isObject: Ho,
      isObjectLike: To,
      isPlainObject: Au,
      isRegExp: Nf,
      isSafeInteger: function (t) {
        return Tf(t) && t >= -9007199254740991 && t <= Pf
      },
      isSet: Qc,
      isString: Gh,
      isSymbol: wo,
      isTypedArray: ws,
      isUndefined: Cf,
      isWeakMap: function (t) {
        return To(t) && '[object WeakMap]' == xc(t)
      },
      isWeakSet: function (t) {
        return To(t) && '[object WeakSet]' == Mo(t)
      },
      lt: Hf,
      lte: Xf,
      toArray: ov,
      toFinite: Zo,
      toInteger: $o,
      toLength: ch,
      toNumber: Vo,
      toPlainObject: Op,
      toSafeInteger: function (t) {
        return t ? Wl($o(t), -9007199254740991, ug) : 0 === t ? t : 0
      },
      toString: au
    },
    Xg = {
      add: Ro,
      ceil: Ul,
      divide: Gp,
      floor: wh,
      max: function (t) {
        return t && t.length ? Wf(t, Jo, Ih) : void 0
      },
      maxBy: function (t, e) {
        return t && t.length ? Wf(t, rp(e), Ih) : void 0
      },
      mean: function (t) {
        return Vf(t, Jo)
      },
      meanBy: function (t, e) {
        return Vf(t, rp(e))
      },
      min: function (t) {
        return t && t.length ? Wf(t, Jo, Uf) : void 0
      },
      minBy: function (t, e) {
        return t && t.length ? Wf(t, rp(e), Uf) : void 0
      },
      multiply: Jf,
      round: my,
      subtract: Uy,
      sum: function (t) {
        return t && t.length ? Yf(t, Jo) : 0
      },
      sumBy: function (t, e) {
        return t && t.length ? Yf(t, rp(e)) : 0
      }
    },
    Gg = function (t, e, n) {
      return (
        void 0 === n && ((n = e), (e = void 0)),
        void 0 !== n && (n = (n = Vo(n)) == n ? n : 0),
        void 0 !== e && (e = (e = Vo(e)) == e ? e : 0),
        Wl(Vo(t), e, n)
      )
    },
    Wg = function (t, e, n) {
      return (
        (e = Zo(e)),
        void 0 === n ? ((n = e), (e = 0)) : (n = Zo(n)),
        (function (t, e, n) {
          return t >= Hh(e, n) && t < Uh(e, n)
        })((t = Vo(t)), e, n)
      )
    },
    Yg = function (t, e, n) {
      if (
        (n && 'boolean' != typeof n && os(t, e, n) && (e = n = void 0),
        void 0 === n &&
          ('boolean' == typeof e
            ? ((n = e), (e = void 0))
            : 'boolean' == typeof t && ((n = t), (t = void 0))),
        void 0 === t && void 0 === e
          ? ((t = 0), (e = 1))
          : ((t = Zo(t)), void 0 === e ? ((e = t), (t = 0)) : (e = Zo(e))),
        t > e)
      ) {
        var r = t
        ;(t = e), (e = r)
      }
      if (n || t % 1 || e % 1) {
        var o = sy()
        return ay(t + o * (e - t + iy('1e-' + ((o + '').length - 1))), e)
      }
      return oy(t, e)
    },
    Fg = {
      assign: js,
      assignIn: zs,
      assignInWith: Us,
      assignWith: Hs,
      at: mu,
      create: function (t, e) {
        var n = xi(t)
        return null == e ? n : Fl(n, e)
      },
      defaults: Tp,
      defaultsDeep: Cp,
      entries: Qp,
      entriesIn: th,
      extend: zs,
      extendWith: Us,
      findKey: function (t, e) {
        return yh(t, rp(e), up)
      },
      findLastKey: function (t, e) {
        return yh(t, rp(e), qp)
      },
      forIn: function (t, e) {
        return null == t ? t : sp(t, Yp(e), Bs)
      },
      forInRight: function (t, e) {
        return null == t ? t : Kp(t, Yp(e), Bs)
      },
      forOwn: function (t, e) {
        return t && up(t, Yp(e))
      },
      forOwnRight: function (t, e) {
        return t && qp(t, Yp(e))
      },
      functions: function (t) {
        return null == t ? [] : Nh(t, Is(t))
      },
      functionsIn: function (t) {
        return null == t ? [] : Nh(t, Bs(t))
      },
      get: du,
      has: zh,
      hasIn: $d,
      invert: rf,
      invertBy: uf,
      invoke: df,
      keys: Is,
      keysIn: Bs,
      mapKeys: Gf,
      mapValues: function (t, e) {
        var n = {}
        return (
          (e = rp(e)),
          up(t, function (t, r, o) {
            Va(n, r, e(t, r, o))
          }),
          n
        )
      },
      merge: Kf,
      mergeWith: Pp,
      omit: uv,
      omitBy: function (t, e) {
        return dv(t, tv(rp(e)))
      },
      pick: Vv,
      pickBy: dv,
      result: function (t, e, n) {
        var r = -1,
          o = (e = su(e, t)).length
        for (o || ((o = 1), (t = void 0)); ++r < o; ) {
          var i = null == t ? void 0 : t[lu(e[r])]
          void 0 === i && ((r = o), (i = n)), (t = ri(i) ? i.call(t) : i)
        }
        return t
      },
      set: Sy,
      setWith: function (t, e, n, r) {
        return (
          (r = 'function' == typeof r ? r : void 0),
          null == t ? t : lv(t, e, n, r)
        )
      },
      toPairs: Qp,
      toPairsIn: th,
      transform: function (t, e, n) {
        var r = No(t),
          o = r || _s(t) || ws(t)
        if (((e = rp(e)), null == n)) {
          var i = t && t.constructor
          n = o ? (r ? new i() : []) : Ho(t) && ri(i) ? xi(bu(t)) : {}
        }
        return (
          (o ? Qi : up)(t, function (t, r, o) {
            return e(n, t, r, o)
          }),
          n
        )
      },
      unset: function (t, e) {
        return null == t || av(t, e)
      },
      update: function (t, e, n) {
        return null == t ? t : wg(t, e, Yp(n))
      },
      updateWith: function (t, e, n, r) {
        return (
          (r = 'function' == typeof r ? r : void 0),
          null == t ? t : wg(t, e, Yp(n), r)
        )
      },
      values: Yh,
      valuesIn: function (t) {
        return null == t ? [] : Wh(t, Bs(t))
      }
    },
    Vg = {
      at: Dg,
      chain: Hl,
      commit: function () {
        return new ki(this.value(), this.__chain__)
      },
      lodash: Hi,
      next: function () {
        void 0 === this.__values__ && (this.__values__ = ov(this.value()))
        var t = this.__index__ >= this.__values__.length
        return {
          done: t,
          value: t ? void 0 : this.__values__[this.__index__++]
        }
      },
      plant: function (t) {
        for (var e, n = this; n instanceof Di; ) {
          var r = zi(n)
          ;(r.__index__ = 0),
            (r.__values__ = void 0),
            e ? (o.__wrapped__ = r) : (e = r)
          var o = r
          n = n.__wrapped__
        }
        return (o.__wrapped__ = t), e
      },
      reverse: function () {
        var t = this.__wrapped__
        if (t instanceof Pi) {
          var e = t
          return (
            this.__actions__.length && (e = new Pi(this)),
            (e = e.reverse()).__actions__.push({
              func: rg,
              args: [_y],
              thisArg: void 0
            }),
            new ki(e, this.__chain__)
          )
        }
        return this.thru(_y)
      },
      tap: function (t, e) {
        return e(t), t
      },
      thru: rg,
      toIterator: function () {
        return this
      },
      toJSON: sg,
      value: sg,
      valueOf: sg,
      wrapperChain: function () {
        return Hl(this)
      }
    },
    Kg = {
      camelCase: Rl,
      capitalize: nl,
      deburr: ul,
      endsWith: function (t, e, n) {
        ;(t = au(t)), (e = Lo(e))
        var r = t.length,
          o = (n = void 0 === n ? r : Wl($o(n), 0, r))
        return (n -= e.length) >= 0 && t.slice(n, o) == e
      },
      escape: oh,
      escapeRegExp: function (t) {
        return (t = au(t)) && ah.test(t) ? t.replace(ih, '\\$&') : t
      },
      kebabCase: Lf,
      lowerCase: Bf,
      lowerFirst: zf,
      pad: function (t, e, n) {
        t = au(t)
        var r = (e = $o(e)) ? kv(t) : 0
        if (!e || r >= e) return t
        var o = (e - r) / 2
        return zv(Hv(o), n) + t + zv(Uv(o), n)
      },
      padEnd: function (t, e, n) {
        t = au(t)
        var r = (e = $o(e)) ? kv(t) : 0
        return e && r < e ? t + zv(e - r, n) : t
      },
      padStart: function (t, e, n) {
        t = au(t)
        var r = (e = $o(e)) ? kv(t) : 0
        return e && r < e ? zv(e - r, n) + t : t
      },
      parseInt: function (t, e, n) {
        return (
          n || null == e ? (e = 0) : e && (e = +e),
          Gv(au(t).replace(Xv, ''), e || 0)
        )
      },
      repeat: function (t, e, n) {
        return (e = (n ? os(t, e, n) : void 0 === e) ? 1 : $o(e)), Mv(au(t), e)
      },
      replace: function () {
        var t = arguments,
          e = au(t[0])
        return t.length < 3 ? e : e.replace(t[1], t[2])
      },
      snakeCase: Oy,
      split: function (t, e, n) {
        return (
          n && 'number' != typeof n && os(t, e, n) && (e = n = void 0),
          (n = void 0 === n ? 4294967295 : n >>> 0)
            ? (t = au(t)) &&
              ('string' == typeof e || (null != e && !Nf(e))) &&
              !(e = Lo(e)) &&
              Uu(t)
              ? Bu(Qu(t), 0, n)
              : t.split(e, n)
            : []
        )
      },
      startCase: zy,
      startsWith: function (t, e, n) {
        return (
          (t = au(t)),
          (n = null == n ? 0 : Wl($o(n), 0, t.length)),
          (e = Lo(e)),
          t.slice(n, n + e.length) == e
        )
      },
      template: function (t, e, n) {
        var r = Vy.imports._.templateSettings || Vy
        n && os(t, e, n) && (e = void 0), (t = au(t)), (e = Us({}, e, r, Gy))
        var o,
          i,
          a = Us({}, e.imports, r.imports, Gy),
          s = Is(a),
          u = Wh(a, s),
          l = 0,
          c = e.interpolate || Qy,
          d = "__p += '",
          p = RegExp(
            (e.escape || Qy).source +
              '|' +
              c.source +
              '|' +
              (c === Fy ? Jy : Qy).source +
              '|' +
              (e.evaluate || Qy).source +
              '|$',
            'g'
          ),
          h = eg.call(e, 'sourceURL')
            ? '//# sourceURL=' + (e.sourceURL + '').replace(/\s/g, ' ') + '\n'
            : ''
        t.replace(p, function (e, n, r, a, s, u) {
          return (
            r || (r = a),
            (d += t.slice(l, u).replace(tg, Yy)),
            n && ((o = !0), (d += "' +\n__e(" + n + ") +\n'")),
            s && ((i = !0), (d += "';\n" + s + ";\n__p += '")),
            r && (d += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"),
            (l = u + e.length),
            e
          )
        }),
          (d += "';\n")
        var f = eg.call(e, 'variable') && e.variable
        if (f) {
          if ($y.test(f))
            throw new Error(
              'Invalid `variable` option passed into `_.template`'
            )
        } else d = 'with (obj) {\n' + d + '\n}\n'
        ;(d = (i ? d.replace(Ky, '') : d).replace(qy, '$1').replace(Zy, '$1;')),
          (d =
            'function(' +
            (f || 'obj') +
            ') {\n' +
            (f ? '' : 'obj || (obj = {});\n') +
            "var __t, __p = ''" +
            (o ? ', __e = _.escape' : '') +
            (i
              ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n"
              : ';\n') +
            d +
            'return __p\n}')
        var v = Pu(function () {
          return Function(s, h + 'return ' + d).apply(void 0, u)
        })
        if (((v.source = d), Nu(v))) throw v
        return v
      },
      templateSettings: Vy,
      toLower: function (t) {
        return au(t).toLowerCase()
      },
      toUpper: function (t) {
        return au(t).toUpperCase()
      },
      trim: function (t, e, n) {
        if ((t = au(t)) && (n || void 0 === e)) return Uo(t)
        if (!t || !(e = Lo(e))) return t
        var r = Qu(t),
          o = Qu(e)
        return Bu(r, cg(r, o), lg(r, o) + 1).join('')
      },
      trimEnd: function (t, e, n) {
        if ((t = au(t)) && (n || void 0 === e)) return t.slice(0, Bo(t) + 1)
        if (!t || !(e = Lo(e))) return t
        var r = Qu(t)
        return Bu(r, 0, lg(r, Qu(e)) + 1).join('')
      },
      trimStart: function (t, e, n) {
        if ((t = au(t)) && (n || void 0 === e)) return t.replace(dg, '')
        if (!t || !(e = Lo(e))) return t
        var r = Qu(t)
        return Bu(r, cg(r, Qu(e))).join('')
      },
      truncate: function (t, e) {
        var n = 30,
          r = '...'
        if (Ho(e)) {
          var o = 'separator' in e ? e.separator : o
          ;(n = 'length' in e ? $o(e.length) : n),
            (r = 'omission' in e ? Lo(e.omission) : r)
        }
        var i = (t = au(t)).length
        if (Uu(t)) {
          var a = Qu(t)
          i = a.length
        }
        if (n >= i) return t
        var s = n - kv(r)
        if (s < 1) return r
        var u = a ? Bu(a, 0, s).join('') : t.slice(0, s)
        if (void 0 === o) return u + r
        if ((a && (s += u.length - s), Nf(o))) {
          if (t.slice(s).search(o)) {
            var l,
              c = u
            for (
              o.global || (o = RegExp(o.source, au(pg.exec(o)) + 'g')),
                o.lastIndex = 0;
              (l = o.exec(c));

            )
              var d = l.index
            u = u.slice(0, void 0 === d ? s : d)
          }
        } else if (t.indexOf(Lo(o), s) != s) {
          var p = u.lastIndexOf(o)
          p > -1 && (u = u.slice(0, p))
        }
        return u + r
      },
      unescape: function (t) {
        return (t = au(t)) && vg.test(t) ? t.replace(fg, hg) : t
      },
      upperCase: Ag,
      upperFirst: el,
      words: Il
    },
    qg = {
      attempt: Pu,
      bindAll: ju,
      cond: function (t) {
        var e = null == t ? 0 : t.length,
          n = rp
        return (
          (t = e
            ? Do(t, function (t) {
                if ('function' != typeof t[1])
                  throw new TypeError('Expected a function')
                return [n(t[0]), t[1]]
              })
            : []),
          ts(function (n) {
            for (var r = -1; ++r < e; ) {
              var o = t[r]
              if (Ti(o[0], this, n)) return Ti(o[1], this, n)
            }
          })
        )
      },
      conforms: function (t) {
        return (function (t) {
          var e = Is(t)
          return function (n) {
            return op(n, t, e)
          }
        })(ud(t, 1))
      },
      constant: qi,
      defaultTo: function (t, e) {
        return null == t || t != t ? e : t
      },
      flow: Oh,
      flowRight: Dh,
      identity: Jo,
      iteratee: function (t) {
        return rp('function' == typeof t ? t : ud(t, 1))
      },
      matches: function (t) {
        return Kd(ud(t, 1))
      },
      matchesProperty: function (t, e) {
        return tp(t, ud(e, 1))
      },
      method: qf,
      methodOf: Zf,
      mixin: $f,
      noop: Ci,
      nthArg: function (t) {
        return (
          (t = $o(t)),
          ts(function (e) {
            return iv(e, t)
          })
        )
      },
      over: vv,
      overEvery: mv,
      overSome: bv,
      property: np,
      propertyOf: function (t) {
        return function (e) {
          return null == t ? void 0 : cu(t, e)
        }
      },
      range: dy,
      rangeRight: py,
      stubArray: Ql,
      stubFalse: fs,
      stubObject: function () {
        return {}
      },
      stubString: function () {
        return ''
      },
      stubTrue: function () {
        return !0
      },
      times: function (t, e) {
        if ((t = $o(t)) < 1 || t > 9007199254740991) return []
        var n = og,
          r = ig(t, og)
        ;(e = Yp(e)), (t -= og)
        for (var o = us(r, e); ++n < t; ) e(n)
        return o
      },
      toPath: function (t) {
        return No(t) ? Do(t, lu) : wo(t) ? [t] : Bi(iu(au(t)))
      },
      uniqueId: function (t) {
        var e = ++Eg
        return au(t) + e
      }
    }
  var Zg = Math.max,
    $g = Math.min
  var Jg = Math.min
  var Qg,
    t_,
    e_ = 4294967295,
    n_ = Array.prototype,
    r_ = Object.prototype.hasOwnProperty,
    o_ = fo ? fo.iterator : void 0,
    i_ = Math.max,
    a_ = Math.min,
    s_ = (function (t) {
      return function (e, n, r) {
        if (null == r) {
          var o = Ho(n),
            i = o && Is(n),
            a = i && i.length && Nh(n, i)
          ;(a ? a.length : o) || ((r = n), (n = e), (e = this))
        }
        return t(e, n, r)
      }
    })($f)
  ;(Hi.after = Ug.after),
    (Hi.ary = Ug.ary),
    (Hi.assign = Fg.assign),
    (Hi.assignIn = Fg.assignIn),
    (Hi.assignInWith = Fg.assignInWith),
    (Hi.assignWith = Fg.assignWith),
    (Hi.at = Fg.at),
    (Hi.before = Ug.before),
    (Hi.bind = Ug.bind),
    (Hi.bindAll = qg.bindAll),
    (Hi.bindKey = Ug.bindKey),
    (Hi.castArray = Hg.castArray),
    (Hi.chain = Vg.chain),
    (Hi.chunk = kg.chunk),
    (Hi.compact = kg.compact),
    (Hi.concat = kg.concat),
    (Hi.cond = qg.cond),
    (Hi.conforms = qg.conforms),
    (Hi.constant = qg.constant),
    (Hi.countBy = Bg.countBy),
    (Hi.create = Fg.create),
    (Hi.curry = Ug.curry),
    (Hi.curryRight = Ug.curryRight),
    (Hi.debounce = Ug.debounce),
    (Hi.defaults = Fg.defaults),
    (Hi.defaultsDeep = Fg.defaultsDeep),
    (Hi.defer = Ug.defer),
    (Hi.delay = Ug.delay),
    (Hi.difference = kg.difference),
    (Hi.differenceBy = kg.differenceBy),
    (Hi.differenceWith = kg.differenceWith),
    (Hi.drop = kg.drop),
    (Hi.dropRight = kg.dropRight),
    (Hi.dropRightWhile = kg.dropRightWhile),
    (Hi.dropWhile = kg.dropWhile),
    (Hi.fill = kg.fill),
    (Hi.filter = Bg.filter),
    (Hi.flatMap = Bg.flatMap),
    (Hi.flatMapDeep = Bg.flatMapDeep),
    (Hi.flatMapDepth = Bg.flatMapDepth),
    (Hi.flatten = kg.flatten),
    (Hi.flattenDeep = kg.flattenDeep),
    (Hi.flattenDepth = kg.flattenDepth),
    (Hi.flip = Ug.flip),
    (Hi.flow = qg.flow),
    (Hi.flowRight = qg.flowRight),
    (Hi.fromPairs = kg.fromPairs),
    (Hi.functions = Fg.functions),
    (Hi.functionsIn = Fg.functionsIn),
    (Hi.groupBy = Bg.groupBy),
    (Hi.initial = kg.initial),
    (Hi.intersection = kg.intersection),
    (Hi.intersectionBy = kg.intersectionBy),
    (Hi.intersectionWith = kg.intersectionWith),
    (Hi.invert = Fg.invert),
    (Hi.invertBy = Fg.invertBy),
    (Hi.invokeMap = Bg.invokeMap),
    (Hi.iteratee = qg.iteratee),
    (Hi.keyBy = Bg.keyBy),
    (Hi.keys = Is),
    (Hi.keysIn = Fg.keysIn),
    (Hi.map = Bg.map),
    (Hi.mapKeys = Fg.mapKeys),
    (Hi.mapValues = Fg.mapValues),
    (Hi.matches = qg.matches),
    (Hi.matchesProperty = qg.matchesProperty),
    (Hi.memoize = Ug.memoize),
    (Hi.merge = Fg.merge),
    (Hi.mergeWith = Fg.mergeWith),
    (Hi.method = qg.method),
    (Hi.methodOf = qg.methodOf),
    (Hi.mixin = s_),
    (Hi.negate = tv),
    (Hi.nthArg = qg.nthArg),
    (Hi.omit = Fg.omit),
    (Hi.omitBy = Fg.omitBy),
    (Hi.once = Ug.once),
    (Hi.orderBy = Bg.orderBy),
    (Hi.over = qg.over),
    (Hi.overArgs = Ug.overArgs),
    (Hi.overEvery = qg.overEvery),
    (Hi.overSome = qg.overSome),
    (Hi.partial = Ug.partial),
    (Hi.partialRight = Ug.partialRight),
    (Hi.partition = Bg.partition),
    (Hi.pick = Fg.pick),
    (Hi.pickBy = Fg.pickBy),
    (Hi.property = qg.property),
    (Hi.propertyOf = qg.propertyOf),
    (Hi.pull = kg.pull),
    (Hi.pullAll = kg.pullAll),
    (Hi.pullAllBy = kg.pullAllBy),
    (Hi.pullAllWith = kg.pullAllWith),
    (Hi.pullAt = kg.pullAt),
    (Hi.range = qg.range),
    (Hi.rangeRight = qg.rangeRight),
    (Hi.rearg = Ug.rearg),
    (Hi.reject = Bg.reject),
    (Hi.remove = kg.remove),
    (Hi.rest = Ug.rest),
    (Hi.reverse = kg.reverse),
    (Hi.sampleSize = Bg.sampleSize),
    (Hi.set = Fg.set),
    (Hi.setWith = Fg.setWith),
    (Hi.shuffle = Bg.shuffle),
    (Hi.slice = kg.slice),
    (Hi.sortBy = Bg.sortBy),
    (Hi.sortedUniq = kg.sortedUniq),
    (Hi.sortedUniqBy = kg.sortedUniqBy),
    (Hi.split = Kg.split),
    (Hi.spread = Ug.spread),
    (Hi.tail = kg.tail),
    (Hi.take = kg.take),
    (Hi.takeRight = kg.takeRight),
    (Hi.takeRightWhile = kg.takeRightWhile),
    (Hi.takeWhile = kg.takeWhile),
    (Hi.tap = Vg.tap),
    (Hi.throttle = Ug.throttle),
    (Hi.thru = rg),
    (Hi.toArray = Hg.toArray),
    (Hi.toPairs = Fg.toPairs),
    (Hi.toPairsIn = Fg.toPairsIn),
    (Hi.toPath = qg.toPath),
    (Hi.toPlainObject = Hg.toPlainObject),
    (Hi.transform = Fg.transform),
    (Hi.unary = Ug.unary),
    (Hi.union = kg.union),
    (Hi.unionBy = kg.unionBy),
    (Hi.unionWith = kg.unionWith),
    (Hi.uniq = kg.uniq),
    (Hi.uniqBy = kg.uniqBy),
    (Hi.uniqWith = kg.uniqWith),
    (Hi.unset = Fg.unset),
    (Hi.unzip = kg.unzip),
    (Hi.unzipWith = kg.unzipWith),
    (Hi.update = Fg.update),
    (Hi.updateWith = Fg.updateWith),
    (Hi.values = Fg.values),
    (Hi.valuesIn = Fg.valuesIn),
    (Hi.without = kg.without),
    (Hi.words = Kg.words),
    (Hi.wrap = Ug.wrap),
    (Hi.xor = kg.xor),
    (Hi.xorBy = kg.xorBy),
    (Hi.xorWith = kg.xorWith),
    (Hi.zip = kg.zip),
    (Hi.zipObject = kg.zipObject),
    (Hi.zipObjectDeep = kg.zipObjectDeep),
    (Hi.zipWith = kg.zipWith),
    (Hi.entries = Fg.toPairs),
    (Hi.entriesIn = Fg.toPairsIn),
    (Hi.extend = Fg.assignIn),
    (Hi.extendWith = Fg.assignInWith),
    s_(Hi, Hi),
    (Hi.add = Xg.add),
    (Hi.attempt = qg.attempt),
    (Hi.camelCase = Kg.camelCase),
    (Hi.capitalize = Kg.capitalize),
    (Hi.ceil = Xg.ceil),
    (Hi.clamp = Gg),
    (Hi.clone = Hg.clone),
    (Hi.cloneDeep = Hg.cloneDeep),
    (Hi.cloneDeepWith = Hg.cloneDeepWith),
    (Hi.cloneWith = Hg.cloneWith),
    (Hi.conformsTo = Hg.conformsTo),
    (Hi.deburr = Kg.deburr),
    (Hi.defaultTo = qg.defaultTo),
    (Hi.divide = Xg.divide),
    (Hi.endsWith = Kg.endsWith),
    (Hi.eq = Hg.eq),
    (Hi.escape = Kg.escape),
    (Hi.escapeRegExp = Kg.escapeRegExp),
    (Hi.every = Bg.every),
    (Hi.find = Bg.find),
    (Hi.findIndex = kg.findIndex),
    (Hi.findKey = Fg.findKey),
    (Hi.findLast = Bg.findLast),
    (Hi.findLastIndex = kg.findLastIndex),
    (Hi.findLastKey = Fg.findLastKey),
    (Hi.floor = Xg.floor),
    (Hi.forEach = Bg.forEach),
    (Hi.forEachRight = Bg.forEachRight),
    (Hi.forIn = Fg.forIn),
    (Hi.forInRight = Fg.forInRight),
    (Hi.forOwn = Fg.forOwn),
    (Hi.forOwnRight = Fg.forOwnRight),
    (Hi.get = Fg.get),
    (Hi.gt = Hg.gt),
    (Hi.gte = Hg.gte),
    (Hi.has = Fg.has),
    (Hi.hasIn = Fg.hasIn),
    (Hi.head = kg.head),
    (Hi.identity = Jo),
    (Hi.includes = Bg.includes),
    (Hi.indexOf = kg.indexOf),
    (Hi.inRange = Wg),
    (Hi.invoke = Fg.invoke),
    (Hi.isArguments = Hg.isArguments),
    (Hi.isArray = No),
    (Hi.isArrayBuffer = Hg.isArrayBuffer),
    (Hi.isArrayLike = Hg.isArrayLike),
    (Hi.isArrayLikeObject = Hg.isArrayLikeObject),
    (Hi.isBoolean = Hg.isBoolean),
    (Hi.isBuffer = Hg.isBuffer),
    (Hi.isDate = Hg.isDate),
    (Hi.isElement = Hg.isElement),
    (Hi.isEmpty = Hg.isEmpty),
    (Hi.isEqual = Hg.isEqual),
    (Hi.isEqualWith = Hg.isEqualWith),
    (Hi.isError = Hg.isError),
    (Hi.isFinite = Hg.isFinite),
    (Hi.isFunction = Hg.isFunction),
    (Hi.isInteger = Hg.isInteger),
    (Hi.isLength = Hg.isLength),
    (Hi.isMap = Hg.isMap),
    (Hi.isMatch = Hg.isMatch),
    (Hi.isMatchWith = Hg.isMatchWith),
    (Hi.isNaN = Hg.isNaN),
    (Hi.isNative = Hg.isNative),
    (Hi.isNil = Hg.isNil),
    (Hi.isNull = Hg.isNull),
    (Hi.isNumber = Hg.isNumber),
    (Hi.isObject = Ho),
    (Hi.isObjectLike = Hg.isObjectLike),
    (Hi.isPlainObject = Hg.isPlainObject),
    (Hi.isRegExp = Hg.isRegExp),
    (Hi.isSafeInteger = Hg.isSafeInteger),
    (Hi.isSet = Hg.isSet),
    (Hi.isString = Hg.isString),
    (Hi.isSymbol = Hg.isSymbol),
    (Hi.isTypedArray = Hg.isTypedArray),
    (Hi.isUndefined = Hg.isUndefined),
    (Hi.isWeakMap = Hg.isWeakMap),
    (Hi.isWeakSet = Hg.isWeakSet),
    (Hi.join = kg.join),
    (Hi.kebabCase = Kg.kebabCase),
    (Hi.last = Up),
    (Hi.lastIndexOf = kg.lastIndexOf),
    (Hi.lowerCase = Kg.lowerCase),
    (Hi.lowerFirst = Kg.lowerFirst),
    (Hi.lt = Hg.lt),
    (Hi.lte = Hg.lte),
    (Hi.max = Xg.max),
    (Hi.maxBy = Xg.maxBy),
    (Hi.mean = Xg.mean),
    (Hi.meanBy = Xg.meanBy),
    (Hi.min = Xg.min),
    (Hi.minBy = Xg.minBy),
    (Hi.stubArray = qg.stubArray),
    (Hi.stubFalse = qg.stubFalse),
    (Hi.stubObject = qg.stubObject),
    (Hi.stubString = qg.stubString),
    (Hi.stubTrue = qg.stubTrue),
    (Hi.multiply = Xg.multiply),
    (Hi.nth = kg.nth),
    (Hi.noop = qg.noop),
    (Hi.now = zg),
    (Hi.pad = Kg.pad),
    (Hi.padEnd = Kg.padEnd),
    (Hi.padStart = Kg.padStart),
    (Hi.parseInt = Kg.parseInt),
    (Hi.random = Yg),
    (Hi.reduce = Bg.reduce),
    (Hi.reduceRight = Bg.reduceRight),
    (Hi.repeat = Kg.repeat),
    (Hi.replace = Kg.replace),
    (Hi.result = Fg.result),
    (Hi.round = Xg.round),
    (Hi.sample = Bg.sample),
    (Hi.size = Bg.size),
    (Hi.snakeCase = Kg.snakeCase),
    (Hi.some = Bg.some),
    (Hi.sortedIndex = kg.sortedIndex),
    (Hi.sortedIndexBy = kg.sortedIndexBy),
    (Hi.sortedIndexOf = kg.sortedIndexOf),
    (Hi.sortedLastIndex = kg.sortedLastIndex),
    (Hi.sortedLastIndexBy = kg.sortedLastIndexBy),
    (Hi.sortedLastIndexOf = kg.sortedLastIndexOf),
    (Hi.startCase = Kg.startCase),
    (Hi.startsWith = Kg.startsWith),
    (Hi.subtract = Xg.subtract),
    (Hi.sum = Xg.sum),
    (Hi.sumBy = Xg.sumBy),
    (Hi.template = Kg.template),
    (Hi.times = qg.times),
    (Hi.toFinite = Hg.toFinite),
    (Hi.toInteger = $o),
    (Hi.toLength = Hg.toLength),
    (Hi.toLower = Kg.toLower),
    (Hi.toNumber = Hg.toNumber),
    (Hi.toSafeInteger = Hg.toSafeInteger),
    (Hi.toString = Hg.toString),
    (Hi.toUpper = Kg.toUpper),
    (Hi.trim = Kg.trim),
    (Hi.trimEnd = Kg.trimEnd),
    (Hi.trimStart = Kg.trimStart),
    (Hi.truncate = Kg.truncate),
    (Hi.unescape = Kg.unescape),
    (Hi.uniqueId = qg.uniqueId),
    (Hi.upperCase = Kg.upperCase),
    (Hi.upperFirst = Kg.upperFirst),
    (Hi.each = Bg.forEach),
    (Hi.eachRight = Bg.forEachRight),
    (Hi.first = kg.head),
    s_(
      Hi,
      ((Qg = {}),
      up(Hi, function (t, e) {
        r_.call(Hi.prototype, e) || (Qg[e] = t)
      }),
      Qg),
      { chain: !1 }
    ),
    (Hi.VERSION = '4.17.21'),
    ((Hi.templateSettings = Kg.templateSettings).imports._ = Hi),
    Qi(
      ['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'],
      function (t) {
        Hi[t].placeholder = Hi
      }
    ),
    Qi(['drop', 'take'], function (t, e) {
      ;(Pi.prototype[t] = function (n) {
        n = void 0 === n ? 1 : i_($o(n), 0)
        var r = this.__filtered__ && !e ? new Pi(this) : this.clone()
        return (
          r.__filtered__
            ? (r.__takeCount__ = a_(n, r.__takeCount__))
            : r.__views__.push({
                size: a_(n, e_),
                type: t + (r.__dir__ < 0 ? 'Right' : '')
              }),
          r
        )
      }),
        (Pi.prototype[t + 'Right'] = function (e) {
          return this.reverse()[t](e).reverse()
        })
    }),
    Qi(['filter', 'map', 'takeWhile'], function (t, e) {
      var n = e + 1,
        r = 1 == n || 3 == n
      Pi.prototype[t] = function (t) {
        var e = this.clone()
        return (
          e.__iteratees__.push({ iteratee: rp(t), type: n }),
          (e.__filtered__ = e.__filtered__ || r),
          e
        )
      }
    }),
    Qi(['head', 'last'], function (t, e) {
      var n = 'take' + (e ? 'Right' : '')
      Pi.prototype[t] = function () {
        return this[n](1).value()[0]
      }
    }),
    Qi(['initial', 'tail'], function (t, e) {
      var n = 'drop' + (e ? '' : 'Right')
      Pi.prototype[t] = function () {
        return this.__filtered__ ? new Pi(this) : this[n](1)
      }
    }),
    (Pi.prototype.compact = function () {
      return this.filter(Jo)
    }),
    (Pi.prototype.find = function (t) {
      return this.filter(t).head()
    }),
    (Pi.prototype.findLast = function (t) {
      return this.reverse().find(t)
    }),
    (Pi.prototype.invokeMap = ts(function (t, e) {
      return 'function' == typeof t
        ? new Pi(this)
        : this.map(function (n) {
            return cf(n, t, e)
          })
    })),
    (Pi.prototype.reject = function (t) {
      return this.filter(tv(rp(t)))
    }),
    (Pi.prototype.slice = function (t, e) {
      t = $o(t)
      var n = this
      return n.__filtered__ && (t > 0 || e < 0)
        ? new Pi(n)
        : (t < 0 ? (n = n.takeRight(-t)) : t && (n = n.drop(t)),
          void 0 !== e &&
            (n = (e = $o(e)) < 0 ? n.dropRight(-e) : n.take(e - t)),
          n)
    }),
    (Pi.prototype.takeRightWhile = function (t) {
      return this.reverse().takeWhile(t).reverse()
    }),
    (Pi.prototype.toArray = function () {
      return this.take(e_)
    }),
    up(Pi.prototype, function (t, e) {
      var n = /^(?:filter|find|map|reject)|While$/.test(e),
        r = /^(?:head|last)$/.test(e),
        o = Hi[r ? 'take' + ('last' == e ? 'Right' : '') : e],
        i = r || /^find/.test(e)
      o &&
        (Hi.prototype[e] = function () {
          var e = this.__wrapped__,
            a = r ? [1] : arguments,
            s = e instanceof Pi,
            u = a[0],
            l = s || No(e),
            c = function (t) {
              var e = o.apply(Hi, hu([t], a))
              return r && d ? e[0] : e
            }
          l && n && 'function' == typeof u && 1 != u.length && (s = l = !1)
          var d = this.__chain__,
            p = !!this.__actions__.length,
            h = i && !d,
            f = s && !p
          if (!i && l) {
            e = f ? e : new Pi(this)
            var v = t.apply(e, a)
            return (
              v.__actions__.push({ func: rg, args: [c], thisArg: void 0 }),
              new ki(v, d)
            )
          }
          return h && f
            ? t.apply(this, a)
            : ((v = this.thru(c)), h ? (r ? v.value()[0] : v.value()) : v)
        })
    }),
    Qi(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function (t) {
      var e = n_[t],
        n = /^(?:push|sort|unshift)$/.test(t) ? 'tap' : 'thru',
        r = /^(?:pop|shift)$/.test(t)
      Hi.prototype[t] = function () {
        var t = arguments
        if (r && !this.__chain__) {
          var o = this.value()
          return e.apply(No(o) ? o : [], t)
        }
        return this[n](function (n) {
          return e.apply(No(n) ? n : [], t)
        })
      }
    }),
    up(Pi.prototype, function (t, e) {
      var n = Hi[e]
      if (n) {
        var r = n.name + ''
        r_.call(Li, r) || (Li[r] = []), Li[r].push({ name: e, func: n })
      }
    }),
    (Li[wa(void 0, 2).name] = [{ name: 'wrapper', func: void 0 }]),
    (Pi.prototype.clone = function () {
      var t = new Pi(this.__wrapped__)
      return (
        (t.__actions__ = Bi(this.__actions__)),
        (t.__dir__ = this.__dir__),
        (t.__filtered__ = this.__filtered__),
        (t.__iteratees__ = Bi(this.__iteratees__)),
        (t.__takeCount__ = this.__takeCount__),
        (t.__views__ = Bi(this.__views__)),
        t
      )
    }),
    (Pi.prototype.reverse = function () {
      if (this.__filtered__) {
        var t = new Pi(this)
        ;(t.__dir__ = -1), (t.__filtered__ = !0)
      } else (t = this.clone()).__dir__ *= -1
      return t
    }),
    (Pi.prototype.value = function () {
      var t = this.__wrapped__.value(),
        e = this.__dir__,
        n = No(t),
        r = e < 0,
        o = n ? t.length : 0,
        i = (function (t, e, n) {
          for (var r = -1, o = n.length; ++r < o; ) {
            var i = n[r],
              a = i.size
            switch (i.type) {
              case 'drop':
                t += a
                break
              case 'dropRight':
                e -= a
                break
              case 'take':
                e = $g(e, t + a)
                break
              case 'takeRight':
                t = Zg(t, e - a)
            }
          }
          return { start: t, end: e }
        })(0, o, this.__views__),
        a = i.start,
        s = i.end,
        u = s - a,
        l = r ? s : a - 1,
        c = this.__iteratees__,
        d = c.length,
        p = 0,
        h = Jg(u, this.__takeCount__)
      if (!n || (!r && o == u && h == u)) return ag(t, this.__actions__)
      var f = []
      t: for (; u-- && p < h; ) {
        for (var v = -1, y = t[(l += e)]; ++v < d; ) {
          var g = c[v],
            _ = g.iteratee,
            m = g.type,
            b = _(y)
          if (2 == m) y = b
          else if (!b) {
            if (1 == m) continue t
            break t
          }
        }
        f[p++] = y
      }
      return f
    }),
    (Hi.prototype.at = Vg.at),
    (Hi.prototype.chain = Vg.wrapperChain),
    (Hi.prototype.commit = Vg.commit),
    (Hi.prototype.next = Vg.next),
    (Hi.prototype.plant = Vg.plant),
    (Hi.prototype.reverse = Vg.reverse),
    (Hi.prototype.toJSON =
      Hi.prototype.valueOf =
      Hi.prototype.value =
        Vg.value),
    (Hi.prototype.first = Hi.prototype.head),
    o_ && (Hi.prototype[o_] = Vg.toIterator),
    (t.Options = void 0),
    ((t_ = t.Options || (t.Options = {})).get = function (t) {
      var e = ro(t, [])
      if (!t.container)
        throw new Error(
          'Ensure the container of LogicFlow is specified and valid.'
        )
      return js({}, t_.defaults, e)
    }),
    (function (t) {
      t.defaults = {
        background: !1,
        grid: !1,
        textEdit: !0,
        snapline: !0,
        outline: !1,
        disabledTools: []
      }
    })(t.Options || (t.Options = {}))
  var u_ = { node: !1, edge: !1 },
    l_ = { node: !0, edge: !0 },
    c_ = function (t) {
      return t && 'boolean' != typeof t ? Kf(ld(u_), t) : ld(!0 === t ? l_ : u_)
    },
    d_ = c_,
    p_ = function () {
      return (
        null !== du(window, 'navigator.userAgent', '').match(/MSIE|Trident/)
      )
    }
  function h_(t) {
    try {
      return JSON.parse(JSON.stringify(t))
    } catch (e) {
      return t
    }
  }
  var f_,
    v_,
    y_,
    g_,
    __,
    m_,
    b_,
    x_ = 200
  ;(t.ElementState = void 0),
    ((f_ = t.ElementState || (t.ElementState = {}))[(f_.DEFAULT = 1)] =
      'DEFAULT'),
    (f_[(f_.TEXT_EDIT = 2)] = 'TEXT_EDIT'),
    (f_[(f_.SHOW_MENU = 3)] = 'SHOW_MENU'),
    (f_[(f_.ALLOW_CONNECT = 4)] = 'ALLOW_CONNECT'),
    (f_[(f_.NOT_ALLOW_CONNECT = 5)] = 'NOT_ALLOW_CONNECT'),
    (t.ElementType = void 0),
    ((v_ = t.ElementType || (t.ElementType = {})).NODE = 'node'),
    (v_.EDGE = 'edge'),
    (v_.GRAPH = 'graph'),
    (t.ModelType = void 0),
    ((y_ = t.ModelType || (t.ModelType = {})).NODE = 'node'),
    (y_.CIRCLE_NODE = 'circle-node'),
    (y_.POLYGON_NODE = 'polygon-node'),
    (y_.RECT_NODE = 'rect-node'),
    (y_.TEXT_NODE = 'text-node'),
    (y_.ELLIPSE_NODE = 'ellipse-node'),
    (y_.DIAMOND_NODE = 'diamond-node'),
    (y_.HTML_NODE = 'html-node'),
    (y_.CUSTOM_HTML_NODE = 'custom-html-node'),
    (y_.EDGE = 'edge'),
    (y_.LINE_EDGE = 'line-edge'),
    (y_.POLYLINE_EDGE = 'polyline-edge'),
    (y_.BEZIER_EDGE = 'bezier-edge'),
    (y_.GRAPH = 'graph'),
    (t.EventType = void 0),
    ((g_ = t.EventType || (t.EventType = {})).ELEMENT_CLICK = 'element:click'),
    (g_.NODE_ADD = 'node:add'),
    (g_.NODE_DELETE = 'node:delete'),
    (g_.NODE_CLICK = 'node:click'),
    (g_.NODE_DBCLICK = 'node:dbclick'),
    (g_.NODE_GROUP_COPY = 'node:group-copy-add'),
    (g_.NODE_DND_ADD = 'node:dnd-add'),
    (g_.NODE_DND_DRAG = 'node:dnd-drag'),
    (g_.NODE_MOUSEDOWN = 'node:mousedown'),
    (g_.NODE_DRAGSTART = 'node:dragstart'),
    (g_.NODE_DRAG = 'node:drag'),
    (g_.NODE_DROP = 'node:drop'),
    (g_.NODE_MOUSEUP = 'node:mouseup'),
    (g_.NODE_MOUSEMOVE = 'node:mousemove'),
    (g_.NODE_MOUSEENTER = 'node:mouseenter'),
    (g_.NODE_MOUSELEAVE = 'node:mouseleave'),
    (g_.NODE_CONTEXTMENU = 'node:contextmenu'),
    (g_.NODE_ROTATE = 'node:rotate'),
    (g_.NODE_RESIZE = 'node:resize'),
    (g_.NODE_FOCUS = 'node:focus'),
    (g_.NODE_BLUR = 'node:blur'),
    (g_.NODE_PROPERTIES_CHANGE = 'node:properties-change'),
    (g_.NODE_PROPERTIES_DELETE = 'node:properties-delete'),
    (g_.EDGE_ADD = 'edge:add'),
    (g_.EDGE_DELETE = 'edge:delete'),
    (g_.EDGE_CLICK = 'edge:click'),
    (g_.EDGE_DBCLICK = 'edge:dbclick'),
    (g_.EDGE_FOCUS = 'edge:focus'),
    (g_.EDGE_BLUR = 'edge:blur'),
    (g_.EDGE_MOUSEENTER = 'edge:mouseenter'),
    (g_.EDGE_MOUSELEAVE = 'edge:mouseleave'),
    (g_.EDGE_CONTEXTMENU = 'edge:contextmenu'),
    (g_.EDGE_ADJUST = 'edge:adjust'),
    (g_.EDGE_EXCHANGE_NODE = 'edge:exchange-node'),
    (g_.ANCHOR_DRAGSTART = 'anchor:dragstart'),
    (g_.ANCHOR_DRAG = 'anchor:drag'),
    (g_.ANCHOR_DROP = 'anchor:drop'),
    (g_.ANCHOR_DRAGEND = 'anchor:dragend'),
    (g_.ADJUST_POINT_MOUSEDOWN = 'adjustPoint:mousedown'),
    (g_.ADJUST_POINT_MOUSEUP = 'adjustPoint:mouseup'),
    (g_.ADJUST_POINT_MOUSEMOVE = 'adjustPoint:mousemove'),
    (g_.ADJUST_POINT_DRAGSTART = 'adjustPoint:dragstart'),
    (g_.ADJUST_POINT_DRAG = 'adjustPoint:drag'),
    (g_.ADJUST_POINT_DROP = 'adjustPoint:drop'),
    (g_.ADJUST_POINT_DRAGEND = 'adjustPoint:dragend'),
    (g_.BLANK_MOUSEDOWN = 'blank:mousedown'),
    (g_.BLANK_DRAGSTART = 'blank:dragstart'),
    (g_.BLANK_DRAG = 'blank:drag'),
    (g_.BLANK_DROP = 'blank:drop'),
    (g_.BLANK_MOUSEMOVE = 'blank:mousemove'),
    (g_.BLANK_MOUSEUP = 'blank:mouseup'),
    (g_.BLANK_CLICK = 'blank:click'),
    (g_.BLANK_CONTEXTMENU = 'blank:contextmenu'),
    (g_.SELECTION_MOUSEDOWN = 'selection:mousedown'),
    (g_.SELECTION_DRAGSTART = 'selection:dragstart'),
    (g_.SELECTION_DRAG = 'selection:drag'),
    (g_.SELECTION_DROP = 'selection:drop'),
    (g_.SELECTION_MOUSEMOVE = 'selection:mousemove'),
    (g_.SELECTION_MOUSEUP = 'selection:mouseup'),
    (g_.SELECTION_CONTEXTMENU = 'selection:contextmenu'),
    (g_.CONNECTION_NOT_ALLOWED = 'connection:not-allowed'),
    (g_.TEXT_MOUSEDOWN = 'text:mousedown'),
    (g_.TEXT_DRAGSTART = 'text:dragstart'),
    (g_.TEXT_DRAG = 'text:drag'),
    (g_.TEXT_DROP = 'text:drop'),
    (g_.TEXT_CLICK = 'text:click'),
    (g_.TEXT_DBCLICK = 'text:dbclick'),
    (g_.TEXT_BLUR = 'text:blur'),
    (g_.TEXT_MOUSEMOVE = 'text:mousemove'),
    (g_.TEXT_MOUSEUP = 'text:mouseup'),
    (g_.TEXT_FOCUS = 'text:focus'),
    (g_.TEXT_ADD = 'text:add'),
    (g_.TEXT_UPDATE = 'text:update'),
    (g_.TEXT_CLEAR = 'text:clear'),
    (g_.LABEL_MOUSEDOWN = 'label:mousedown'),
    (g_.LABEL_DRAGSTART = 'label:dragstart'),
    (g_.LABEL_DRAG = 'label:drag'),
    (g_.LABEL_DROP = 'label:drop'),
    (g_.LABEL_CLICK = 'label:click'),
    (g_.LABEL_DBCLICK = 'label:dbclick'),
    (g_.LABEL_BLUR = 'label:blur'),
    (g_.LABEL_MOUSEMOVE = 'label:mousemove'),
    (g_.LABEL_MOUSEUP = 'label:mouseup'),
    (g_.LABEL_FOCUS = 'label:focus'),
    (g_.LABEL_ADD = 'label:add'),
    (g_.LABEL_UPDATE = 'label:update'),
    (g_.LABEL_CLEAR = 'label:clear'),
    (g_.LABEL_DELETE = 'label:delete'),
    (g_.LABEL_SHOULD_ADD = 'label:should-add'),
    (g_.LABEL_BATCH_ADD = 'label:batch-add'),
    (g_.LABEL_SHOULD_UPDATE = 'label:should-update'),
    (g_.LABEL_SHOULD_DELETE = 'label:should-delete'),
    (g_.LABEL_BATCH_DELETE = 'label:batch-delete'),
    (g_.LABEL_NOT_ALLOWED_ADD = 'label:not-allowed-add'),
    (g_.HISTORY_CHANGE = 'history:change'),
    (g_.GRAPH_TRANSFORM = 'graph:transform'),
    (g_.GRAPH_RENDERED = 'graph:rendered'),
    (g_.GRAPH_UPDATED = 'graph:updated'),
    (t.OverlapMode = void 0),
    ((__ = t.OverlapMode || (t.OverlapMode = {}))[(__.DEFAULT = 0)] =
      'DEFAULT'),
    (__[(__.INCREASE = 1)] = 'INCREASE'),
    (t.SegmentDirection = void 0),
    ((m_ = t.SegmentDirection || (t.SegmentDirection = {})).HORIZONTAL =
      'horizontal'),
    (m_.VERTICAL = 'vertical'),
    (t.TextMode = void 0),
    ((b_ = t.TextMode || (t.TextMode = {})).TEXT = 'text'),
    (b_.LABEL = 'label')
  var E_ = (function () {
      function e(e) {
        var n = e.onDragStart,
          r = void 0 === n ? Ci : n,
          o = e.onDragging,
          i = void 0 === o ? Ci : o,
          a = e.onDragEnd,
          s = void 0 === a ? Ci : a,
          u = e.eventType,
          l = void 0 === u ? '' : u,
          c = e.eventCenter,
          d = e.step,
          p = void 0 === d ? 1 : d,
          h = e.isStopPropagation,
          f = void 0 === h || h,
          v = e.model,
          y = e.data,
          g = this
        ;(this.isDragging = !1),
          (this.isStartDragging = !1),
          (this.startX = 0),
          (this.startY = 0),
          (this.sumDeltaX = 0),
          (this.sumDeltaY = 0),
          (this.handleMouseDown = function (e) {
            var n,
              r,
              o =
                null === window || void 0 === window ? void 0 : window.document
            if (0 === e.button) {
              g.isStopPropagation && e.stopPropagation(),
                (g.isStartDragging = !0),
                (g.startX = e.clientX),
                (g.startY = e.clientY),
                o.addEventListener('mousemove', g.handleMouseMove, !1),
                o.addEventListener('mouseup', g.handleMouseUp, !1)
              var i =
                null === (n = g.model) || void 0 === n ? void 0 : n.getData()
              null === (r = g.eventCenter) ||
                void 0 === r ||
                r.emit(t.EventType[''.concat(g.eventType, '_MOUSEDOWN')], {
                  e: e,
                  data: g.data || i
                }),
                (g.startTime = new Date().getTime())
            }
          }),
          (this.handleMouseMove = function (e) {
            var n, r
            if (
              (g.isStopPropagation && e.stopPropagation(),
              g.isStartDragging &&
                ((g.sumDeltaX += e.clientX - g.startX),
                (g.sumDeltaY += e.clientY - g.startY),
                (g.startX = e.clientX),
                (g.startY = e.clientY),
                g.step <= 1 ||
                  Math.abs(g.sumDeltaX) > g.step ||
                  Math.abs(g.sumDeltaY) > g.step))
            ) {
              var o = g.sumDeltaX % g.step,
                i = g.sumDeltaY % g.step,
                a = g.sumDeltaX - o,
                s = g.sumDeltaY - i
              ;(g.sumDeltaX = o), (g.sumDeltaY = i)
              var u =
                null === (n = g.model) || void 0 === n ? void 0 : n.getData()
              g.isDragging ||
                (null === (r = g.eventCenter) ||
                  void 0 === r ||
                  r.emit(t.EventType[''.concat(g.eventType, '_DRAGSTART')], {
                    e: e,
                    data: g.data || u
                  }),
                g.onDragStart({ event: e })),
                (g.isDragging = !0),
                Promise.resolve().then(function () {
                  var n, r
                  g.onDragging({ deltaX: a, deltaY: s, event: e }),
                    null === (n = g.eventCenter) ||
                      void 0 === n ||
                      n.emit(
                        t.EventType[''.concat(g.eventType, '_MOUSEMOVE')],
                        { deltaX: a, deltaY: s, e: e, data: g.data || u }
                      ),
                    null === (r = g.eventCenter) ||
                      void 0 === r ||
                      r.emit(t.EventType[''.concat(g.eventType, '_DRAG')], {
                        e: e,
                        data: g.data || u
                      })
                })
            }
          }),
          (this.handleMouseUp = function (e) {
            var n = window.document
            ;(g.isStartDragging = !1),
              g.isStopPropagation && e.stopPropagation(),
              Promise.resolve().then(function () {
                var r, o, i
                n.removeEventListener('mousemove', g.handleMouseMove, !1),
                  n.removeEventListener('mouseup', g.handleMouseUp, !1)
                var a =
                  null === (r = g.model) || void 0 === r ? void 0 : r.getData()
                null === (o = g.eventCenter) ||
                  void 0 === o ||
                  o.emit(t.EventType[''.concat(g.eventType, '_MOUSEUP')], {
                    e: e,
                    data: g.data || a
                  }),
                  g.isDragging &&
                    ((g.isDragging = !1),
                    g.onDragEnd({ event: e }),
                    null === (i = g.eventCenter) ||
                      void 0 === i ||
                      i.emit(t.EventType[''.concat(g.eventType, '_DROP')], {
                        e: e,
                        data: g.data || a
                      }))
              })
          }),
          (this.cancelDrag = function () {
            var t =
              null === window || void 0 === window ? void 0 : window.document
            t.removeEventListener('mousemove', g.handleMouseMove, !1),
              t.removeEventListener('mouseup', g.handleMouseUp, !1),
              g.onDragEnd({ event: void 0 }),
              (g.isDragging = !1)
          }),
          (this.destroy = function () {
            g.isStartDragging && g.cancelDrag()
          }),
          (this.onDragStart = r),
          (this.onDragging = i),
          (this.onDragEnd = s),
          (this.step = p),
          (this.isStopPropagation = f),
          (this.eventType = l),
          (this.eventCenter = c),
          (this.model = v),
          (this.data = y)
      }
      return (
        (e.prototype.setStep = function (t) {
          this.step = t
        }),
        (e.prototype.setModel = function (t) {
          this.model = t
        }),
        e
      )
    })(),
    M_ = function (t) {
      var e = t.x,
        n = t.y,
        r = t.width,
        o = t.height
      return { x: e - r / 2, y: n - o / 2, x1: e + r / 2, y1: n + o / 2 }
    },
    T_ = function (t) {
      var e = t.startPoint,
        n = t.endPoint,
        r = (e.x + n.x) / 2,
        o = (e.y + n.y) / 2,
        i = Math.abs(e.x - n.x) + 10,
        a = Math.abs(e.y - n.y) + 10
      return { x: r - i / 2, y: o - a / 2, x1: r + i / 2, y1: o + a / 2 }
    },
    S_ = function (t) {
      var e = t.points,
        n = um(e),
        r = z_(n, 8),
        o = r.x,
        i = r.y,
        a = r.width,
        s = r.height
      return { x: o - a / 2, y: i - s / 2, x1: o + a / 2, y1: i + s / 2 }
    },
    w_ = function (t) {
      var e = t.path,
        n = ym(e),
        r = z_(n, 8),
        o = r.x,
        i = r.y,
        a = r.width,
        s = r.height
      return { x: o - a / 2, y: i - s / 2, x1: o + a / 2, y1: i + s / 2 }
    },
    A_ = function (e) {
      return e.modelType === t.ModelType.LINE_EDGE
        ? T_(e)
        : e.modelType === t.ModelType.POLYLINE_EDGE
        ? S_(e)
        : e.modelType === t.ModelType.BEZIER_EDGE
        ? w_(e)
        : void 0
    },
    O_ = function (t, e, n, r) {
      var o = (e.y - t.y) * (r.x - n.x) - (t.x - e.x) * (n.y - r.y)
      if (0 === o) return !1
      var i =
          ((e.x - t.x) * (r.x - n.x) * (n.y - t.y) +
            (e.y - t.y) * (r.x - n.x) * t.x -
            (r.y - n.y) * (e.x - t.x) * n.x) /
          o,
        a =
          -(
            (e.y - t.y) * (r.y - n.y) * (n.x - t.x) +
            (e.x - t.x) * (r.y - n.y) * t.y -
            (r.x - n.x) * (e.y - t.y) * n.y
          ) / o
      return (
        (i - t.x) * (i - e.x) <= 0 &&
        (a - t.y) * (a - e.y) <= 0 &&
        (i - n.x) * (i - r.x) <= 0 &&
        (a - n.y) * (a - r.y) <= 0 && { x: i, y: a }
      )
    },
    D_ = function (t, e, n) {
      var r = t.x,
        o = t.y,
        i = e.x,
        a = e.y,
        s = n.x,
        u = n.y,
        l = (u - a) / (s - i),
        c = a - l * i
      return (
        ((r >= i && r <= s) || (r <= i && r >= s)) &&
        ((o >= a && o <= u) || (o <= a && o >= u)) &&
        Math.abs(o - l * r - c) < Number.EPSILON
      )
    },
    N_ = function (t) {
      var e = t.start,
        n = t.end,
        r = t.offset,
        o = t.verticalLength,
        i = t.type,
        a = { leftX: 0, leftY: 0, rightX: 0, rightY: 0 },
        s = Math.atan((n.y - e.y) / (n.x - e.x)),
        u = Math.atan(r / o),
        l = Math.sqrt(o * o + r * r)
      return (
        'start' === i
          ? n.x >= e.x
            ? ((a.leftX = e.x + l * Math.sin(s + u)),
              (a.leftY = e.y - l * Math.cos(s + u)),
              (a.rightX = e.x - l * Math.sin(s - u)),
              (a.rightY = e.y + l * Math.cos(s - u)))
            : ((a.leftX = e.x - l * Math.sin(s + u)),
              (a.leftY = e.y + l * Math.cos(s + u)),
              (a.rightX = e.x + l * Math.sin(s - u)),
              (a.rightY = e.y - l * Math.cos(s - u)))
          : 'end' === i &&
            (n.x >= e.x
              ? ((a.leftX = n.x + l * Math.sin(s - u)),
                (a.leftY = n.y - l * Math.cos(s - u)),
                (a.rightX = n.x - l * Math.sin(s + u)),
                (a.rightY = n.y + l * Math.cos(s + u)))
              : ((a.leftX = n.x - l * Math.sin(s - u)),
                (a.leftY = n.y + l * Math.cos(s - u)),
                (a.rightX = n.x + l * Math.sin(s + u)),
                (a.rightY = n.y - l * Math.cos(s + u)))),
        a
      )
    },
    P_ = function (t, e) {
      var n
      switch (t.type) {
        case 'line':
        default:
          n = new ux(t, e)
          break
        case 'polyline':
          n = new lx(t, e)
      }
      return n
    },
    C_ = function (t, e) {
      return (
        2 * Math.abs(t.centerX - e.centerX) < t.width + e.width &&
        2 * Math.abs(t.centerY - e.centerY) < t.height + e.height
      )
    },
    I_ = function (t) {
      var e = [],
        n = {}
      return (
        t.forEach(function (t) {
          var e = ''.concat(t.x, '-').concat(t.y)
          ;(t.id = e), (n[e] = t)
        }),
        Object.keys(n).forEach(function (t) {
          e.push(n[t])
        }),
        e
      )
    },
    L_ = function (t, e) {
      var n = [t, { x: t.x, y: e.y }, e]
      return I_(n)
    },
    j_ = function (t, e) {
      return 0 === t.width && 0 === t.height
        ? t
        : {
            x: t.x,
            y: t.y,
            centerX: t.centerX,
            centerY: t.centerY,
            minX: t.minX - e,
            minY: t.minY - e,
            maxX: t.maxX + e,
            maxY: t.maxY + e,
            height: t.height + 2 * e,
            width: t.width + 2 * e
          }
    },
    R_ = function (e, n) {
      var r = Math.abs(e.x - n.centerX),
        o = Math.abs(e.y - n.centerY)
      return r / n.width > o / n.height
        ? t.SegmentDirection.HORIZONTAL
        : t.SegmentDirection.VERTICAL
    },
    k_ = function (e, n, r) {
      return R_(r, n) === t.SegmentDirection.HORIZONTAL
        ? { x: r.x > e.centerX ? e.maxX : e.minX, y: r.y }
        : { x: r.x, y: r.y > e.centerY ? e.maxY : e.minY }
    },
    B_ = function (t, e) {
      var n = Math.min(t.minX, e.minX),
        r = Math.min(t.minY, e.minY),
        o = Math.max(t.maxX, e.maxX),
        i = Math.max(t.maxY, e.maxY)
      return {
        x: (n + o) / 2,
        y: (r + i) / 2,
        centerX: (n + o) / 2,
        centerY: (r + i) / 2,
        minX: n,
        minY: r,
        maxX: o,
        maxY: i,
        height: i - r,
        width: o - n
      }
    },
    z_ = function (t, e) {
      void 0 === t && (t = [])
      var n = [],
        r = []
      t.forEach(function (t) {
        n.push(t.x), r.push(t.y)
      })
      var o = Math.min.apply(Math, so([], ao(n), !1)),
        i = Math.max.apply(Math, so([], ao(n), !1)),
        a = Math.min.apply(Math, so([], ao(r), !1)),
        s = Math.max.apply(Math, so([], ao(r), !1)),
        u = i - o,
        l = s - a
      return (
        e && ((u += e), (l += e)),
        {
          centerX: (o + i) / 2,
          centerY: (a + s) / 2,
          maxX: i,
          maxY: s,
          minX: o,
          minY: a,
          x: (o + i) / 2,
          y: (a + s) / 2,
          height: l,
          width: u
        }
      )
    },
    U_ = function (t) {
      var e = t.minX,
        n = t.minY,
        r = t.maxX,
        o = t.maxY
      return [
        { x: e, y: n },
        { x: r, y: n },
        { x: r, y: o },
        { x: e, y: o }
      ]
    },
    H_ = function (t, e) {
      var n = t.x,
        r = t.y
      return n < e.minX || n > e.maxX || r < e.minY || r > e.maxY
    },
    X_ = function (t, e) {
      return e < t.minX || e > t.maxX
        ? []
        : [
            { x: e, y: t.minY },
            { x: e, y: t.maxY }
          ]
    },
    G_ = function (t, e) {
      return e < t.minY || e > t.maxY
        ? []
        : [
            { x: t.minX, y: e },
            { x: t.maxX, y: e }
          ]
    },
    W_ = function (t, e) {
      return so(so([], ao(X_(t, e.x)), !1), ao(G_(t, e.y)), !1)
    },
    Y_ = function (t, e) {
      return Math.abs(t.x - e.x) + Math.abs(t.y - e.y)
    },
    F_ = function (t, e) {
      var n = 0
      return (
        e.forEach(function (e) {
          e && (t.x === e.x && (n += -2), t.y === e.y && (n += -2))
        }),
        n
      )
    },
    V_ = function (t, e, n, r, o) {
      return Y_(t, e) + Y_(t, n) + F_(t, [e, n, r, o])
    },
    K_ = function (t, e, n, r, o) {
      o || (o = 0),
        t.unshift(e[r]),
        n[r] && n[r] !== r && o <= 100 && K_(t, e, n, n[r], o + 1)
    },
    q_ = function (t, e) {
      var n = t.indexOf(e)
      n > -1 && t.splice(n, 1)
    },
    Z_ = function (t, e, n, r) {
      var o = e.x - t.x,
        i = e.y - t.y,
        a = r.x - n.x,
        s = r.y - n.y,
        u = (-i * (t.x - n.x) + o * (t.y - n.y)) / (-a * i + o * s),
        l = (a * (t.y - n.y) - s * (t.x - n.x)) / (-a * i + o * s)
      return u >= 0 && u <= 1 && l >= 0 && l <= 1
    },
    $_ = function (t, e, n) {
      if (0 === n.width && 0 === n.height) return !1
      var r = ao(U_(n), 4),
        o = r[0],
        i = r[1],
        a = r[2],
        s = r[3]
      return (
        Z_(t, e, o, i) || Z_(t, e, o, s) || Z_(t, e, i, a) || Z_(t, e, a, s)
      )
    },
    J_ = function (t, e, n, r) {
      var o = []
      return (
        t.forEach(function (t) {
          t !== e &&
            ((t.x !== e.x && t.y !== e.y) ||
              $_(t, e, n) ||
              $_(t, e, r) ||
              o.push(t))
        }),
        I_(o)
      )
    },
    Q_ = function (t, e, n, r, o, i, a) {
      var s = [],
        u = [e],
        l = {},
        c = {},
        d = {}
      e.id && ((c[e.id] = 0), (d[e.id] = V_(e, n, e)))
      var p = {}
      t.forEach(function (t) {
        t.id && (p[t.id] = t)
      })
      for (
        var h = function () {
          var h,
            f = 1 / 0
          if (
            (u.forEach(function (t) {
              t.id && d[t.id] < f && ((f = d[t.id]), (h = t))
            }),
            h === n && n.id)
          ) {
            var v = []
            return K_(v, p, l, n.id), { value: v }
          }
          if (!h) return { value: [e, n] }
          q_(u, h),
            s.push(h),
            J_(t, h, r, o).forEach(function (t) {
              if (
                -1 === s.indexOf(t) &&
                (-1 === u.indexOf(t) && u.push(t),
                (null == h ? void 0 : h.id) && (null == t ? void 0 : t.id))
              ) {
                var r = d[h.id] + Y_(h, t)
                if (c[t.id] && r >= c[t.id]) return
                ;(l[t.id] = h.id),
                  (c[t.id] = r),
                  (d[t.id] = c[t.id] + V_(t, n, e, i, a))
              }
            })
        };
        u.length;

      ) {
        var f = h()
        if ('object' == typeof f) return f.value
      }
      return [e, n]
    },
    tm = function (t) {
      return Wm(t)
    },
    em = function (t) {
      for (var e = 1; e < t.length - 1; ) {
        var n = t[e - 1],
          r = t[e],
          o = t[e + 1]
        ;(n.x === r.x && r.x === o.x) || (n.y === r.y && r.y === o.y)
          ? t.splice(e, 1)
          : e++
      }
      return t
    },
    nm = function (t, e, n, r, o) {
      var i = tm(n),
        a = tm(r),
        s = j_(i, o),
        u = j_(a, o),
        l = k_(s, i, t),
        c = k_(u, a, e)
      if (C_(s, u)) return so(so([t, l], ao(lm(t, e, l, c)), !1), [c, e], !1)
      var d = z_([l, c]),
        p = B_(s, d),
        h = B_(u, d),
        f = []
      f = (f = f.concat(U_(p))).concat(U_(h))
      var v = { x: (t.x + e.x) / 2, y: (t.y + e.y) / 2 }
      ;[d, p, h].forEach(function (t) {
        f = f.concat(
          W_(t, v).filter(function (t) {
            return H_(t, s) && H_(t, u)
          })
        )
      }),
        [
          { x: l.x, y: c.y },
          { x: c.x, y: l.y }
        ].forEach(function (t) {
          H_(t, s) && H_(t, u) && f.push(t)
        }),
        f.unshift(l),
        f.push(c),
        (f = I_(f))
      var y = Q_(f, l, c, i, a, t, e)
      return y.unshift(t), y.push(e), y.length > 2 && (y = em(y)), I_(y)
    },
    rm = function (t) {
      if (1 === t.length) {
        var e = ao(t, 1)[0]
        return [e, e]
      }
      for (
        var n = t[0], r = t[1], o = Hm(n.x, n.y, r.x, r.y), i = 1;
        i < t.length - 1;
        i++
      ) {
        var a = t[i],
          s = t[i + 1],
          u = Hm(a.x, a.y, s.x, s.y)
        u > o && ((o = u), (n = a), (r = s))
      }
      return [n, r]
    },
    om = function (t, e, n) {
      var r = Xm(t, n),
        o = Xm(e, n)
      return r && o
    },
    im = function (t, e, n) {
      var r = Xm(t, n),
        o = Xm(e, n)
      return !(r && o) && (r || o)
    },
    am = function (t, e, n) {
      for (var r = void 0, o = Wm(n), i = U_(o), a = 0; a < i.length; a++) {
        Z_(t, e, i[a], i[(a + 1) % i.length]) &&
          (r = [i[a], i[(a + 1) % i.length]])
      }
      if (r) return O_(t, e, r[0], r[1])
    },
    sm = function (e, n) {
      var r = void 0
      return (
        e.x === n.x
          ? (r = t.SegmentDirection.VERTICAL)
          : e.y === n.y && (r = t.SegmentDirection.HORIZONTAL),
        r
      )
    },
    um = function (t) {
      var e = t.split(' '),
        n = []
      return (
        e &&
          e.forEach(function (t) {
            var e = ao(t.split(','), 2),
              r = e[0],
              o = e[1]
            n.push({ x: Number(r), y: Number(o) })
          }),
        n
      )
    },
    lm = function (t, e, n, r) {
      var o = []
      if (sm(t, n) === sm(e, r))
        t.y === n.y
          ? (o.push({ x: n.x, y: (n.y + r.y) / 2 }),
            o.push({ x: r.x, y: (n.y + r.y) / 2 }))
          : (o.push({ x: (n.x + r.x) / 2, y: n.y }),
            o.push({ x: (n.x + r.x) / 2, y: r.y }))
      else {
        var i = { x: n.x, y: r.y },
          a = D_(i, t, n),
          s = D_(i, e, r)
        if (a || s) i = { x: r.x, y: n.y }
        else {
          var u = cm(i, t, n),
            l = cm(i, e, r)
          u && l && (i = { x: r.x, y: n.y })
        }
        o.push(i)
      }
      return o
    },
    cm = function (t, e, n) {
      return (t.x === e.x && t.x === n.x) || (t.y === e.y && t.y === n.y)
    },
    dm = function (t) {
      if (!t) return 0
      for (var e = 0, n = 0; n < t.length; n++) {
        var r = t.charCodeAt(n)
        t.match(/[A-Z]/)
          ? (e += 1.5)
          : (e += (r >= 1 && r <= 126) || (r >= 65376 && r <= 65439) ? 1 : 2)
      }
      return e
    },
    pm = void 0,
    hm = function (t, e) {
      pm || (pm = document.createElement('canvas'))
      var n = pm.getContext('2d')
      return (n.font = e), n.measureText(t).width
    },
    fm = function (t) {
      var e,
        n = t.start,
        r = t.end
      if (n.x === r.x && n.y === r.y) e = ''
      else {
        var o = { start: n, end: r, offset: 10, verticalLength: 5 },
          i = N_(no(no({}, o), { type: 'start' })),
          a = N_(no(no({}, o), { type: 'end' }))
        e = 'M'
          .concat(i.leftX, ' ')
          .concat(i.leftY, '\n    L')
          .concat(i.rightX, ' ')
          .concat(i.rightY, '\n    L')
          .concat(a.rightX, ' ')
          .concat(a.rightY, '\n    L')
          .concat(a.leftX, ' ')
          .concat(a.leftY, ' z')
      }
      return {
        d: e,
        fill: 'transparent',
        stroke: 'transparent',
        strokeWidth: 1,
        strokeDasharray: '4, 4'
      }
    },
    vm = function (t) {
      var e = t.start,
        n = t.end,
        r = t.sourceNode,
        o = t.targetNode,
        i = t.offset,
        a = Wm(r),
        s = Wm(o),
        u = j_(a, i),
        l = j_(s, i)
      return { sNext: k_(u, a, e), ePre: k_(l, s, n) }
    },
    ym = function (t) {
      var e = t.replace(/M/g, '').replace(/C/g, ',').split(',')
      return [gm(e[0]), gm(e[1]), gm(e[2]), gm(e[3])]
    },
    gm = function (t) {
      var e = ao(t.replace(/(^\s*)/g, '').split(' '), 2)
      return { x: +e[0], y: +e[1] }
    },
    _m = function (t, e) {
      var n = ao(t, 4)
      return [Kb(n[0], n[1], n[2], n[3], e), t[3]]
    },
    mm = function (t, e) {
      for (
        var n,
          r = t.x,
          o = t.y,
          i = um(e),
          a = Number.MAX_SAFE_INTEGER,
          s = [],
          u = 0;
        u < i.length;
        u++
      )
        s.push({ start: i[u], end: i[(u + 1) % i.length] })
      if (
        (s.forEach(function (t) {
          var e = t.start,
            i = t.end
          if (e.x === i.x) {
            var s = { x: e.x, y: o }
            if (D_(s, e, i)) (u = Math.abs(e.x - r)) < a && ((a = u), (n = s))
          } else if (e.y === i.y) {
            var u
            s = { x: r, y: e.y }
            if (D_(s, e, i)) (u = Math.abs(e.y - o)) < a && ((a = u), (n = s))
          }
        }),
        !n)
      ) {
        var l = s[0],
          c = l.start,
          d = l.end
        n = { x: c.x + (d.x - c.x) / 2, y: c.y + (d.y - c.y) / 2 }
      }
      return n
    },
    bm = function (t) {
      return Vv(t, [
        'id',
        'type',
        'sourceNodeId',
        'sourceAnchorId',
        'targetNodeId',
        'targetAnchorId',
        'pointsList',
        'startPoint',
        'endPoint',
        'properties'
      ])
    },
    xm = function (t, e) {
      return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
    }
  function Em(t, e) {
    return 'function' != typeof e
      ? function (e, n, r) {
          return Object.assign({ type: t.edgeType }, r)
        }
      : function (n, r, o) {
          var i = e(n, r, o)
          return i
            ? 'string' == typeof i
              ? Object.assign({}, o, { type: i })
              : Object.assign({ type: i }, o)
            : { type: t.edgeType }
        }
  }
  var Mm = function (t) {
    var e = t.rows,
      n = t.rowsLength,
      r = t.fontSize,
      o = 0
    return (
      Fp(e, function (t) {
        var e = dm(t)
        o = e > o ? e : o
      }),
      { width: Math.ceil(o / 2) * r + r / 4, height: n * (r + 2) + r / 4 }
    )
  }
  function Tm(t, e, n) {
    return (n && e * Math.round(t / e)) || t
  }
  function Sm(t, e) {
    return t % e
  }
  function wm(t, e, n) {
    if (!t) return []
    var r = Math.min.apply(
        Math,
        so(
          [],
          ao(
            t.map(function (t) {
              return t[0]
            })
          ),
          !1
        )
      ),
      o = Math.max.apply(
        Math,
        so(
          [],
          ao(
            t.map(function (t) {
              return t[0]
            })
          ),
          !1
        )
      ),
      i = Math.min.apply(
        Math,
        so(
          [],
          ao(
            t.map(function (t) {
              return t[1]
            })
          ),
          !1
        )
      ),
      a = Math.max.apply(
        Math,
        so(
          [],
          ao(
            t.map(function (t) {
              return t[1]
            })
          ),
          !1
        )
      ),
      s = -r,
      u = -i,
      l = t.map(function (t) {
        var e = ao(t, 2),
          n = e[0],
          r = e[1]
        return [n + s, r + u]
      }),
      c = e ? e / (o - r) : 1,
      d = n ? n / (a - i) : 1,
      p = Math.min(c, d)
    return l.map(function (t) {
      var e = ao(t, 2),
        n = e[0],
        r = e[1]
      return [n * p, r * p]
    })
  }
  var Am = function (t, e, n) {
      var r = ao(t, 2),
        o = r[0],
        i = r[1],
        a = ao(e, 2),
        s = a[0],
        u = a[1],
        l = ao(n, 2),
        c = l[0],
        d = l[1]
      return o > s && o < c && i > u && i < d
    },
    Om = function (t, e) {
      var n = !1
      switch (e.multipleSelectKey) {
        case 'meta':
          n = t.metaKey
          break
        case 'alt':
          n = t.altKey
          break
        case 'shift':
          n = t.shiftKey
          break
        case 'ctrl':
          n = t.ctrlKey
          break
        default:
          n = !1
      }
      return n
    }
  function Dm(t, e) {
    return !!(t instanceof Pm && e instanceof Pm)
  }
  var Nm = (function (t) {
      function e(n, r, o) {
        var i = t.call(this, 3) || this
        return (
          (i[0] = n),
          (i[1] = r),
          (i[2] = o),
          (i.x = n),
          (i.y = r),
          (i.z = o),
          Object.setPrototypeOf(i, e.prototype),
          i
        )
      }
      return (
        eo(e, t),
        (e.prototype.add = function (t) {
          if (Dm(this, t)) return new Pm(this.x + t.x, this.y + t.y)
          var e = this.z + t.z
          return new Cm((this.x + t.x) / e, (this.y + t.y) / e)
        }),
        (e.prototype.subtract = function (t) {
          if (Dm(this, t)) return new Pm(this.x - t.x, this.y - t.y)
          var e = this.z - t.z
          return 0 === e
            ? new Pm(this.x - t.x, this.y - t.y)
            : new Cm((this.x - t.x) / e, (this.y - t.y) / e)
        }),
        e
      )
    })(Array),
    Pm = (function (t) {
      function e(n, r, o) {
        var i = t.call(this, n, r, null != o ? o : 0) || this
        return Object.setPrototypeOf(i, e.prototype), i
      }
      return (
        eo(e, t),
        (e.prototype.toString = function () {
          return 'Vector'
        }),
        (e.prototype.dot = function (t) {
          var e = this
          return t.reduce(function (t, n, r) {
            return t + n * e[r]
          })
        }),
        (e.prototype.cross = function (t) {
          return new e(
            this.y * t.z - this.z * t.y,
            this.z * t.x - this.x * t.z,
            this.x * t.y - this.y * t.x
          )
        }),
        (e.prototype.getLength = function () {
          return Math.hypot(this.x, this.y)
        }),
        (e.prototype.normalize = function () {
          var t = this.getLength()
          return new e(this.x / t, this.y / t)
        }),
        (e.prototype.crossZ = function (t) {
          return this.x * t.y - this.y * t.x
        }),
        (e.prototype.angle = function (t) {
          var e = this.crossZ(t),
            n = Math.acos(this.normalize().dot(t.normalize()))
          return e >= 0 ? n : -n
        }),
        e
      )
    })(Nm),
    Cm = (function (t) {
      function e(n, r) {
        var o = t.call(this, n, r, 1) || this
        return Object.setPrototypeOf(o, e.prototype), o
      }
      return (
        eo(e, t),
        (e.prototype.toString = function () {
          return 'Point'
        }),
        e
      )
    })(Nm),
    Im = (function (t) {
      function e() {
        for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r]
        var o = t.call(this, n.length) || this
        return (
          o.fill(new Array(3)),
          n.forEach(function (t, e) {
            o[e] = t
          }),
          (o.columns = n[0].length),
          (o.rows = n.length),
          Object.setPrototypeOf(o, e.prototype),
          o
        )
      }
      return (
        eo(e, t),
        (e.prototype.getRow = function (t) {
          return this[t]
        }),
        (e.prototype.getColumn = function (t) {
          return so(
            [],
            ao(
              this.map(function (e) {
                return e[t]
              })
            ),
            !1
          )
        }),
        (e.prototype.transpose = function () {
          for (var t = [], n = 0; n < this.columns; n++)
            t.push(this.getColumn(n))
          return new (e.bind.apply(e, so([void 0], ao(t), !1)))()
        }),
        (e.prototype.cross = function (t) {
          var n = new Array(this.rows).fill('').map(function () {
            return []
          })
          if (this.columns === t.rows)
            for (var r = 0; r < this.rows; r++)
              for (
                var o = this.getRow(r),
                  i = function (e) {
                    var i = t.getColumn(e)
                    n[r][e] = o.reduce(function (t, e, n) {
                      return t + e * i[n]
                    }, 0)
                  },
                  a = 0;
                a < t.columns;
                a++
              )
                i(a)
          return new (e.bind.apply(e, so([void 0], ao(n), !1)))()
        }),
        (e.prototype.to2D = function () {
          return this.map(function (t) {
            return [t[0], t[1]]
          })
        }),
        (e.prototype.toPoints = function () {
          return this.map(function (t) {
            return new Cm(t[0], t[1])
          })
        }),
        (e.prototype.toString = function () {
          var t = ao(this[0], 2),
            e = t[0],
            n = t[1],
            r = ao(this[1], 2),
            o = r[0],
            i = r[1],
            a = ao(this[2], 2),
            s = a[0],
            u = a[1]
          return 'matrix('
            .concat(e, ' ')
            .concat(n, ' ')
            .concat(o, ' ')
            .concat(i, ' ')
            .concat(s, ' ')
            .concat(u, ')')
        }),
        (e.prototype.translate = function (t, e) {
          return this.cross(new Rm(t, e))
        }),
        (e.prototype.rotate = function (t) {
          return this.cross(new Lm(t))
        }),
        (e.prototype.scale = function (t, e) {
          return this.cross(new jm(t, e))
        }),
        e
      )
    })(Array),
    Lm = (function (t) {
      function e(n) {
        var r =
          t.call(
            this,
            new Pm(+Math.cos(n).toFixed(2), +Math.sin(n).toFixed(2), 0),
            new Pm(-Math.sin(n).toFixed(2), +Math.cos(n).toFixed(2), 0),
            new Pm(0, 0, 1)
          ) || this
        return Object.setPrototypeOf(r, e.prototype), r
      }
      return (
        eo(e, t),
        (e.prototype.inverse = function () {
          return this.transpose()
        }),
        e
      )
    })(Im),
    jm = (function (t) {
      function e(n, r) {
        var o =
          t.call(this, new Pm(n, 0, 0), new Pm(0, r, 0), new Pm(0, 0, 1)) ||
          this
        return (o.sx = n), (o.sy = r), Object.setPrototypeOf(o, e.prototype), o
      }
      return (
        eo(e, t),
        (e.prototype.inverse = function () {
          return new e(1 / this.sx, 1 / this.sy)
        }),
        e
      )
    })(Im),
    Rm = (function (t) {
      function e(n, r) {
        var o =
          t.call(this, new Pm(1, 0, 0), new Pm(0, 1, 0), new Pm(n, r, 1)) ||
          this
        return (o.tx = n), (o.ty = r), Object.setPrototypeOf(o, e.prototype), o
      }
      return (
        eo(e, t),
        (e.prototype.inverse = function () {
          return new e(-this.tx, -this.ty)
        }),
        e
      )
    })(Im)
  ce({ isolateGlobalState: !0 })
  var km = function (t) {
      return t.anchors
    },
    Bm = function (t, e) {
      for (var n, r = e.nodes, o = r.length - 1; o >= 0; o--) {
        var i = r[o]
        if (Gm(t, i)) {
          var a = i.getTargetAnchor(t)
          if (a) {
            var s = { node: i, anchorIndex: a.index, anchor: a.anchor }
            ;(n && !zm(i, n.node, e)) || (n = s)
          }
        }
      }
      return n
    },
    zm = function (t, e, n) {
      return (
        t.zIndex > e.zIndex || n.nodesMap[t.id].index > n.nodesMap[e.id].index
      )
    },
    Um = function (t, e) {
      for (
        var n, r = km(e), o = Number.MAX_SAFE_INTEGER, i = 0;
        i < r.length;
        i++
      ) {
        var a = Hm(t.x, t.y, r[i].x, r[i].y)
        a < o &&
          ((o = a),
          (n = {
            index: i,
            anchor: no(no({}, r[i]), { x: r[i].x, y: r[i].y, id: r[i].id })
          }))
      }
      return n
    },
    Hm = function (t, e, n, r) {
      return Math.hypot(t - n, e - r)
    },
    Xm = function (t, e) {
      var n = !1,
        r = Wm(e)
      return (
        t.x >= r.minX - 0 &&
          t.x <= r.maxX + 0 &&
          t.y >= r.minY - 0 &&
          t.y <= r.maxY + 0 &&
          (n = !0),
        n
      )
    },
    Gm = function (t, e) {
      var n = !1,
        r = Wm(e)
      return (
        t.x >= r.minX - 5 &&
          t.x <= r.maxX + 5 &&
          t.y >= r.minY - 5 &&
          t.y <= r.maxY + 5 &&
          (n = !0),
        n
      )
    },
    Wm = function (t) {
      var e = t.x,
        n = t.y,
        r = t.width,
        o = t.height
      return {
        minX: e - r / 2,
        minY: n - o / 2,
        maxX: e + r / 2,
        maxY: n + o / 2,
        x: e,
        y: n,
        width: r,
        height: o,
        centerX: e,
        centerY: n
      }
    },
    Ym = function (t) {
      var e = t,
        n = e.x,
        r = e.y,
        o = e.width,
        i = e.height,
        a = e.radius
      return [
        { x: n - o / 2 + a, y: r - i / 2 + a, r: a },
        { x: n + o / 2 - a, y: r - i / 2 + a, r: a },
        { x: n - o / 2 + a, y: r + i / 2 - a, r: a },
        { x: n + o / 2 - a, y: r + i / 2 - a, r: a }
      ]
    },
    Fm = function (t, e, n) {
      var r,
        o = Ym(n),
        i = Number.MAX_SAFE_INTEGER
      return (
        o.forEach(function (e) {
          var n = Hm(t.x, t.y, e.x, e.y)
          n < i && ((i = n), (r = e))
        }),
        Vm(t, e, r)
      )
    },
    Vm = function (e, n, r) {
      var o,
        i = r.x,
        a = r.y,
        s = r.r
      if (n === t.SegmentDirection.HORIZONTAL) {
        var u = i - Math.sqrt(s * s - (e.y - a) * (e.y - a)),
          l = i + Math.sqrt(s * s - (e.y - a) * (e.y - a))
        o = { x: Math.abs(u - e.x) < Math.abs(l - e.x) ? u : l, y: e.y }
      } else if (n === t.SegmentDirection.VERTICAL) {
        var c = a - Math.sqrt(s * s - (e.x - i) * (e.x - i)),
          d = a + Math.sqrt(s * s - (e.x - i) * (e.x - i)),
          p = Math.abs(c - e.y) < Math.abs(d - e.y) ? c : d
        o = { x: e.x, y: p }
      }
      return o
    },
    Km = function (e, n) {
      var r = Math.abs(e.x - n.x),
        o = Math.abs(e.y - n.y)
      return r / n.width > o / n.height
        ? t.SegmentDirection.VERTICAL
        : t.SegmentDirection.HORIZONTAL
    },
    qm = function (t, e) {
      var n = e,
        r = !1,
        o = n.x,
        i = n.y,
        a = n.width,
        s = n.height,
        u = n.radius,
        l = o - a / 2 + u,
        c = o + a / 2 - u,
        d = i - s / 2 + u,
        p = i + s / 2 - u
      return (
        t.y === i + s / 2 || t.y === i - s / 2
          ? (r = t.x > l && t.x < c)
          : (t.x !== o + a / 2 && t.x !== o - a / 2) ||
            (r = t.y > d && t.y < p),
        r
      )
    },
    Zm = function (e, n, r) {
      var o,
        i = r,
        a = i.x,
        s = i.y,
        u = i.rx,
        l = i.ry
      if (n === t.SegmentDirection.HORIZONTAL) {
        var c =
            a - Math.sqrt(u * u - ((e.y - s) * (e.y - s) * u * u) / (l * l)),
          d = a + Math.sqrt(u * u - ((e.y - s) * (e.y - s) * u * u) / (l * l))
        o = { x: Math.abs(c - e.x) < Math.abs(d - e.x) ? c : d, y: e.y }
      } else if (n === t.SegmentDirection.VERTICAL) {
        var p =
            s - Math.sqrt(l * l - ((e.x - a) * (e.x - a) * l * l) / (u * u)),
          h = s + Math.sqrt(l * l - ((e.x - a) * (e.x - a) * l * l) / (u * u)),
          f = Math.abs(p - e.y) < Math.abs(h - e.y) ? p : h
        o = { x: e.x, y: f }
      }
      return o
    },
    $m = function (e, n, r) {
      for (
        var o, i = r.pointsPosition, a = Number.MAX_SAFE_INTEGER, s = [], u = 0;
        u < i.length;
        u++
      )
        s.push({ start: i[u], end: i[(u + 1) % i.length] })
      return (
        s.forEach(function (r) {
          var i = r.start,
            s = r.end,
            u = i,
            l = s
          i.x > s.x && ((u = s), (l = i))
          var c = { x: e.x, y: e.y }
          if (
            (u.x === l.x &&
              n === t.SegmentDirection.HORIZONTAL &&
              (c = { x: u.x, y: e.y }),
            u.y === l.y &&
              n === t.SegmentDirection.VERTICAL &&
              (c = { x: e.x, y: u.y }),
            u.x !== l.x && u.y !== l.y)
          ) {
            var d = (l.y - u.y) / (l.x - u.x),
              p = (u.x * l.y - l.x * u.y) / (u.x - l.x)
            n === t.SegmentDirection.HORIZONTAL
              ? (c = { x: (e.y - p) / d, y: e.y })
              : n === t.SegmentDirection.VERTICAL &&
                (c = { x: e.x, y: d * e.x + p })
          }
          if (D_(c, i, s)) {
            var h = Hm(c.x, c.y, e.x, e.y)
            h < a && ((a = h), (o = c))
          }
        }),
        o
      )
    },
    Jm = function (t) {
      return Vv(t, [
        'id',
        'type',
        'x',
        'y',
        'text',
        'label',
        'properties',
        'virtual',
        'rotate',
        'resizable',
        'rotatable'
      ])
    },
    Qm = function (t, e, n, r) {
      var o = t.x,
        i = t.y
      return (
        e.x > t.x ? (o = t.x + n / 2) : e.x < t.x && (o = t.x - n / 2),
        e.y > t.y ? (i = t.y + r / 2) : e.y < t.y && (i = t.y - r / 2),
        { x: o, y: i }
      )
    },
    tb = function (t) {
      var e = t.rows,
        n = t.style,
        r = t.rowsLength,
        o = t.className,
        i = document.createElement('div')
      ;(i.className = o),
        (i.style.fontSize = ''.concat(n.fontSize)),
        (i.style.width = ''.concat(n.width)),
        (i.style.lineHeight = ''.concat(n.lineHeight)),
        (i.style.padding = ''.concat(n.padding)),
        n.fontFamily && (i.style.fontFamily = ''.concat(n.fontFamily)),
        r > 1
          ? e.forEach(function (t) {
              var e = document.createElement('div')
              ;(e.textContent = t), i.appendChild(e)
            })
          : (i.textContent = e[0]),
        document.body.appendChild(i)
      var a = i.clientHeight
      return document.body.removeChild(i), a
    },
    eb = function (t) {
      var e = t.rows,
        n = t.rowsLength,
        r = t.fontSize,
        o = 0
      return (
        e &&
          e.forEach(function (t) {
            var e = dm(t)
            o = e > o ? e : o
          }),
        { width: Math.ceil(o / 2) * r + r / 4, height: n * (r + 2) + r / 4 }
      )
    },
    nb = function (t) {
      return 'object' != typeof t
        ? { isAllPass: !!t, msg: t ? '' : '不允许连接' }
        : t
    }
  let rb
  const ob = new Uint8Array(16)
  function ib() {
    if (
      !rb &&
      ((rb =
        'undefined' != typeof crypto &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)),
      !rb)
    )
      throw new Error(
        'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
      )
    return rb(ob)
  }
  var ab =
    /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i
  const sb = []
  for (let t = 0; t < 256; ++t) sb.push((t + 256).toString(16).slice(1))
  function ub(t, e = 0) {
    return (
      sb[t[e + 0]] +
      sb[t[e + 1]] +
      sb[t[e + 2]] +
      sb[t[e + 3]] +
      '-' +
      sb[t[e + 4]] +
      sb[t[e + 5]] +
      '-' +
      sb[t[e + 6]] +
      sb[t[e + 7]] +
      '-' +
      sb[t[e + 8]] +
      sb[t[e + 9]] +
      '-' +
      sb[t[e + 10]] +
      sb[t[e + 11]] +
      sb[t[e + 12]] +
      sb[t[e + 13]] +
      sb[t[e + 14]] +
      sb[t[e + 15]]
    )
  }
  function lb(t) {
    if (
      !(function (t) {
        return 'string' == typeof t && ab.test(t)
      })(t)
    )
      throw TypeError('Invalid UUID')
    let e
    const n = new Uint8Array(16)
    return (
      (n[0] = (e = parseInt(t.slice(0, 8), 16)) >>> 24),
      (n[1] = (e >>> 16) & 255),
      (n[2] = (e >>> 8) & 255),
      (n[3] = 255 & e),
      (n[4] = (e = parseInt(t.slice(9, 13), 16)) >>> 8),
      (n[5] = 255 & e),
      (n[6] = (e = parseInt(t.slice(14, 18), 16)) >>> 8),
      (n[7] = 255 & e),
      (n[8] = (e = parseInt(t.slice(19, 23), 16)) >>> 8),
      (n[9] = 255 & e),
      (n[10] = ((e = parseInt(t.slice(24, 36), 16)) / 1099511627776) & 255),
      (n[11] = (e / 4294967296) & 255),
      (n[12] = (e >>> 24) & 255),
      (n[13] = (e >>> 16) & 255),
      (n[14] = (e >>> 8) & 255),
      (n[15] = 255 & e),
      n
    )
  }
  function cb(t, e, n) {
    function r(t, r, o, i) {
      var a
      if (
        ('string' == typeof t &&
          (t = (function (t) {
            t = unescape(encodeURIComponent(t))
            const e = []
            for (let n = 0; n < t.length; ++n) e.push(t.charCodeAt(n))
            return e
          })(t)),
        'string' == typeof r && (r = lb(r)),
        16 !== (null === (a = r) || void 0 === a ? void 0 : a.length))
      )
        throw TypeError(
          'Namespace must be array-like (16 iterable integer values, 0-255)'
        )
      let s = new Uint8Array(16 + t.length)
      if (
        (s.set(r),
        s.set(t, r.length),
        (s = n(s)),
        (s[6] = (15 & s[6]) | e),
        (s[8] = (63 & s[8]) | 128),
        o)
      ) {
        i = i || 0
        for (let t = 0; t < 16; ++t) o[i + t] = s[t]
        return o
      }
      return ub(s)
    }
    try {
      r.name = t
    } catch (t) {}
    return (
      (r.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'),
      (r.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8'),
      r
    )
  }
  function db(t) {
    return 14 + (((t + 64) >>> 9) << 4) + 1
  }
  function pb(t, e) {
    const n = (65535 & t) + (65535 & e)
    return (((t >> 16) + (e >> 16) + (n >> 16)) << 16) | (65535 & n)
  }
  function hb(t, e, n, r, o, i) {
    return pb(((a = pb(pb(e, t), pb(r, i))) << (s = o)) | (a >>> (32 - s)), n)
    var a, s
  }
  function fb(t, e, n, r, o, i, a) {
    return hb((e & n) | (~e & r), t, e, o, i, a)
  }
  function vb(t, e, n, r, o, i, a) {
    return hb((e & r) | (n & ~r), t, e, o, i, a)
  }
  function yb(t, e, n, r, o, i, a) {
    return hb(e ^ n ^ r, t, e, o, i, a)
  }
  function gb(t, e, n, r, o, i, a) {
    return hb(n ^ (e | ~r), t, e, o, i, a)
  }
  cb('v3', 48, function (t) {
    if ('string' == typeof t) {
      const e = unescape(encodeURIComponent(t))
      t = new Uint8Array(e.length)
      for (let n = 0; n < e.length; ++n) t[n] = e.charCodeAt(n)
    }
    return (function (t) {
      const e = [],
        n = 32 * t.length,
        r = '0123456789abcdef'
      for (let o = 0; o < n; o += 8) {
        const n = (t[o >> 5] >>> o % 32) & 255,
          i = parseInt(r.charAt((n >>> 4) & 15) + r.charAt(15 & n), 16)
        e.push(i)
      }
      return e
    })(
      (function (t, e) {
        ;(t[e >> 5] |= 128 << e % 32), (t[db(e) - 1] = e)
        let n = 1732584193,
          r = -271733879,
          o = -1732584194,
          i = 271733878
        for (let e = 0; e < t.length; e += 16) {
          const a = n,
            s = r,
            u = o,
            l = i
          ;(n = fb(n, r, o, i, t[e], 7, -680876936)),
            (i = fb(i, n, r, o, t[e + 1], 12, -389564586)),
            (o = fb(o, i, n, r, t[e + 2], 17, 606105819)),
            (r = fb(r, o, i, n, t[e + 3], 22, -1044525330)),
            (n = fb(n, r, o, i, t[e + 4], 7, -176418897)),
            (i = fb(i, n, r, o, t[e + 5], 12, 1200080426)),
            (o = fb(o, i, n, r, t[e + 6], 17, -1473231341)),
            (r = fb(r, o, i, n, t[e + 7], 22, -45705983)),
            (n = fb(n, r, o, i, t[e + 8], 7, 1770035416)),
            (i = fb(i, n, r, o, t[e + 9], 12, -1958414417)),
            (o = fb(o, i, n, r, t[e + 10], 17, -42063)),
            (r = fb(r, o, i, n, t[e + 11], 22, -1990404162)),
            (n = fb(n, r, o, i, t[e + 12], 7, 1804603682)),
            (i = fb(i, n, r, o, t[e + 13], 12, -40341101)),
            (o = fb(o, i, n, r, t[e + 14], 17, -1502002290)),
            (r = fb(r, o, i, n, t[e + 15], 22, 1236535329)),
            (n = vb(n, r, o, i, t[e + 1], 5, -165796510)),
            (i = vb(i, n, r, o, t[e + 6], 9, -1069501632)),
            (o = vb(o, i, n, r, t[e + 11], 14, 643717713)),
            (r = vb(r, o, i, n, t[e], 20, -373897302)),
            (n = vb(n, r, o, i, t[e + 5], 5, -701558691)),
            (i = vb(i, n, r, o, t[e + 10], 9, 38016083)),
            (o = vb(o, i, n, r, t[e + 15], 14, -660478335)),
            (r = vb(r, o, i, n, t[e + 4], 20, -405537848)),
            (n = vb(n, r, o, i, t[e + 9], 5, 568446438)),
            (i = vb(i, n, r, o, t[e + 14], 9, -1019803690)),
            (o = vb(o, i, n, r, t[e + 3], 14, -187363961)),
            (r = vb(r, o, i, n, t[e + 8], 20, 1163531501)),
            (n = vb(n, r, o, i, t[e + 13], 5, -1444681467)),
            (i = vb(i, n, r, o, t[e + 2], 9, -51403784)),
            (o = vb(o, i, n, r, t[e + 7], 14, 1735328473)),
            (r = vb(r, o, i, n, t[e + 12], 20, -1926607734)),
            (n = yb(n, r, o, i, t[e + 5], 4, -378558)),
            (i = yb(i, n, r, o, t[e + 8], 11, -2022574463)),
            (o = yb(o, i, n, r, t[e + 11], 16, 1839030562)),
            (r = yb(r, o, i, n, t[e + 14], 23, -35309556)),
            (n = yb(n, r, o, i, t[e + 1], 4, -1530992060)),
            (i = yb(i, n, r, o, t[e + 4], 11, 1272893353)),
            (o = yb(o, i, n, r, t[e + 7], 16, -155497632)),
            (r = yb(r, o, i, n, t[e + 10], 23, -1094730640)),
            (n = yb(n, r, o, i, t[e + 13], 4, 681279174)),
            (i = yb(i, n, r, o, t[e], 11, -358537222)),
            (o = yb(o, i, n, r, t[e + 3], 16, -722521979)),
            (r = yb(r, o, i, n, t[e + 6], 23, 76029189)),
            (n = yb(n, r, o, i, t[e + 9], 4, -640364487)),
            (i = yb(i, n, r, o, t[e + 12], 11, -421815835)),
            (o = yb(o, i, n, r, t[e + 15], 16, 530742520)),
            (r = yb(r, o, i, n, t[e + 2], 23, -995338651)),
            (n = gb(n, r, o, i, t[e], 6, -198630844)),
            (i = gb(i, n, r, o, t[e + 7], 10, 1126891415)),
            (o = gb(o, i, n, r, t[e + 14], 15, -1416354905)),
            (r = gb(r, o, i, n, t[e + 5], 21, -57434055)),
            (n = gb(n, r, o, i, t[e + 12], 6, 1700485571)),
            (i = gb(i, n, r, o, t[e + 3], 10, -1894986606)),
            (o = gb(o, i, n, r, t[e + 10], 15, -1051523)),
            (r = gb(r, o, i, n, t[e + 1], 21, -2054922799)),
            (n = gb(n, r, o, i, t[e + 8], 6, 1873313359)),
            (i = gb(i, n, r, o, t[e + 15], 10, -30611744)),
            (o = gb(o, i, n, r, t[e + 6], 15, -1560198380)),
            (r = gb(r, o, i, n, t[e + 13], 21, 1309151649)),
            (n = gb(n, r, o, i, t[e + 4], 6, -145523070)),
            (i = gb(i, n, r, o, t[e + 11], 10, -1120210379)),
            (o = gb(o, i, n, r, t[e + 2], 15, 718787259)),
            (r = gb(r, o, i, n, t[e + 9], 21, -343485551)),
            (n = pb(n, a)),
            (r = pb(r, s)),
            (o = pb(o, u)),
            (i = pb(i, l))
        }
        return [n, r, o, i]
      })(
        (function (t) {
          if (0 === t.length) return []
          const e = 8 * t.length,
            n = new Uint32Array(db(e))
          for (let r = 0; r < e; r += 8) n[r >> 5] |= (255 & t[r / 8]) << r % 32
          return n
        })(t),
        8 * t.length
      )
    )
  })
  var _b = {
    randomUUID:
      'undefined' != typeof crypto &&
      crypto.randomUUID &&
      crypto.randomUUID.bind(crypto)
  }
  function mb(t, e, n) {
    if (_b.randomUUID && !e && !t) return _b.randomUUID()
    const r = (t = t || {}).random || (t.rng || ib)()
    return (r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), ub(r)
  }
  function bb(t, e, n, r) {
    switch (t) {
      case 0:
        return (e & n) ^ (~e & r)
      case 1:
      case 3:
        return e ^ n ^ r
      case 2:
        return (e & n) ^ (e & r) ^ (n & r)
    }
  }
  function xb(t, e) {
    return (t << e) | (t >>> (32 - e))
  }
  cb('v5', 80, function (t) {
    const e = [1518500249, 1859775393, 2400959708, 3395469782],
      n = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]
    if ('string' == typeof t) {
      const e = unescape(encodeURIComponent(t))
      t = []
      for (let n = 0; n < e.length; ++n) t.push(e.charCodeAt(n))
    } else Array.isArray(t) || (t = Array.prototype.slice.call(t))
    t.push(128)
    const r = t.length / 4 + 2,
      o = Math.ceil(r / 16),
      i = new Array(o)
    for (let e = 0; e < o; ++e) {
      const n = new Uint32Array(16)
      for (let r = 0; r < 16; ++r)
        n[r] =
          (t[64 * e + 4 * r] << 24) |
          (t[64 * e + 4 * r + 1] << 16) |
          (t[64 * e + 4 * r + 2] << 8) |
          t[64 * e + 4 * r + 3]
      i[e] = n
    }
    ;(i[o - 1][14] = (8 * (t.length - 1)) / Math.pow(2, 32)),
      (i[o - 1][14] = Math.floor(i[o - 1][14])),
      (i[o - 1][15] = (8 * (t.length - 1)) & 4294967295)
    for (let t = 0; t < o; ++t) {
      const r = new Uint32Array(80)
      for (let e = 0; e < 16; ++e) r[e] = i[t][e]
      for (let t = 16; t < 80; ++t)
        r[t] = xb(r[t - 3] ^ r[t - 8] ^ r[t - 14] ^ r[t - 16], 1)
      let o = n[0],
        a = n[1],
        s = n[2],
        u = n[3],
        l = n[4]
      for (let t = 0; t < 80; ++t) {
        const n = Math.floor(t / 20),
          i = (xb(o, 5) + bb(n, a, s, u) + l + e[n] + r[t]) >>> 0
        ;(l = u), (u = s), (s = xb(a, 30) >>> 0), (a = o), (o = i)
      }
      ;(n[0] = (n[0] + o) >>> 0),
        (n[1] = (n[1] + a) >>> 0),
        (n[2] = (n[2] + s) >>> 0),
        (n[3] = (n[3] + u) >>> 0),
        (n[4] = (n[4] + l) >>> 0)
    }
    return [
      (n[0] >> 24) & 255,
      (n[0] >> 16) & 255,
      (n[0] >> 8) & 255,
      255 & n[0],
      (n[1] >> 24) & 255,
      (n[1] >> 16) & 255,
      (n[1] >> 8) & 255,
      255 & n[1],
      (n[2] >> 24) & 255,
      (n[2] >> 16) & 255,
      (n[2] >> 8) & 255,
      255 & n[2],
      (n[3] >> 24) & 255,
      (n[3] >> 16) & 255,
      (n[3] >> 8) & 255,
      255 & n[3],
      (n[4] >> 24) & 255,
      (n[4] >> 16) & 255,
      (n[4] >> 8) & 255,
      255 & n[4]
    ]
  })
  var Eb,
    Mb = function () {
      return mb()
    },
    Tb = function (t, e) {
      void 0 === e && (e = '')
      var n = t.nodes.reduce(function (t, n) {
        return (t[n.id] = e + mb()), (n.id = t[n.id]), t
      }, {})
      return (
        t.edges.forEach(function (t) {
          ;(t.id = e + mb()),
            (t.sourceNodeId = n[t.sourceNodeId]),
            (t.targetNodeId = n[t.targetNodeId])
        }),
        t
      )
    },
    Sb = new Map(),
    wb = function (t) {
      var e = Mb()
      var n = window.requestAnimationFrame(function n() {
        if ((t(), Sb.get(e))) {
          var r = window.requestAnimationFrame(n)
          Sb.set(e, r)
        }
      })
      return Sb.set(e, n), e
    },
    Ab = function (t) {
      var e = Sb.get(t)
      e && (window.cancelAnimationFrame(e), Sb.delete(t))
    }
  function Ob(e) {
    var n = e.x,
      r = void 0 === n ? 0 : n,
      o = e.y,
      i = void 0 === o ? 0 : o,
      a = e.value,
      s = e.fontSize,
      u = void 0 === s ? 12 : s,
      l = e.fill,
      c = void 0 === l ? 'currentColor' : l,
      d = e.overflowMode,
      p = void 0 === d ? 'default' : d,
      h = e.textWidth,
      f = void 0 === h ? void 0 : h,
      v = e.model,
      y = {
        x: r,
        y: i,
        fill: c,
        fontSize: u,
        textAnchor: 'middle',
        dominantBaseline: 'central'
      }
    if (
      (Fp(Qp(e), function (t) {
        var e = ao(t, 2),
          n = e[0],
          r = e[1]
        'object' != typeof r && (y[n] = r)
      }),
      a)
    ) {
      var g = String(a).split(/[\r\n]/g),
        _ = g.length
      if ('default' !== p) {
        var m = v.BaseType,
          b = v.modelType
        if (
          (m === t.ElementType.NODE && b !== t.ModelType.TEXT_NODE) ||
          (m === t.ElementType.EDGE && f)
        )
          return Db(e)
      }
      if (_ > 1) {
        var x = g.map(function (t, e) {
          return lo('tspan', {
            className: 'lf-text-tspan',
            x: r,
            y: i + (e - (_ - 1) / 2) * (u + 2),
            children: t
          })
        })
        return lo('text', no({}, y, { children: x }))
      }
      return lo('text', no({}, y, { children: a }))
    }
    return null
  }
  function Db(t) {
    var e = t.x,
      n = t.y,
      r = t.value,
      o = t.model,
      i = t.textWidth,
      a = t.fontSize,
      s = void 0 === a ? 12 : a,
      u = t.lineHeight,
      l = t.fontFamily,
      c = void 0 === l ? '' : l,
      d = t.wrapPadding,
      p = void 0 === d ? '0, 0' : d,
      h = t.overflowMode,
      f = o.width,
      v = o.height,
      y = o.textHeight,
      g = i || f,
      _ = String(r).split(/[\r\n]/g),
      m = _.length,
      b = tb({
        rows: _,
        style: {
          fontSize: ''.concat(s, 'px'),
          width: ''.concat(g, 'px'),
          fontFamily: c,
          lineHeight: u,
          padding: p
        },
        rowsLength: m,
        className: 'lf-get-text-height'
      }),
      x = v > b ? v : b
    y && (x = y)
    var E = 'ellipsis' === h
    return (
      E && (x = s + 2),
      lo('g', {
        children: lo('foreignObject', {
          width: g,
          height: x,
          x: e - g / 2,
          y: n - x / 2,
          style: { overflow: 'visible', textAlign: 'left' },
          children: lo('div', {
            className: 'lf-node-text-auto-wrap',
            style: { minHeight: x, width: g, padding: p },
            children: lo('div', {
              className: E
                ? 'lf-node-text-ellipsis-content'
                : 'lf-node-text-auto-wrap-content',
              title: E ? _.join('') : '',
              style: no({}, t),
              children: _.map(function (t) {
                return lo('div', {
                  className: 'lf-node-text--auto-wrap-inner',
                  children: t
                })
              })
            })
          })
        })
      })
    )
  }
  function Nb(t) {
    var e = { x1: 10, y1: 10, x2: 20, y2: 20, stroke: 'black' }
    return (
      Fp(Qp(t), function (t) {
        var n = ao(t, 2),
          r = n[0],
          o = n[1]
        ;('style' === r || 'object' != typeof o) && (e[r] = o)
      }),
      lo('line', no({}, e))
    )
  }
  function Pb(t) {
    var e = t.x,
      n = t.y,
      r = t.width,
      o = t.height,
      i = t.className,
      a = t.strokeWidth,
      s = t.radius,
      u = void 0 === s ? 0 : s,
      l = e - r / 2,
      c = n - o / 2,
      d = {}
    return (
      (d['stroke-width'] = a),
      Fp(Qp(t), function (t) {
        var e = ao(t, 2),
          n = e[0],
          r = e[1]
        'object' != typeof r && (d[n] = r)
      }),
      (d.className = i ? 'lf-basic-shape '.concat(i) : 'lf-basic-shape'),
      u && ((d.rx = u), (d.ry = u)),
      (d.x = l),
      (d.y = c),
      lo('rect', no({}, d))
    )
  }
  function Cb(t) {
    var e = { d: '' }
    return (
      Fp(Qp(t), function (t) {
        var n = ao(t, 2),
          r = n[0],
          o = n[1]
        ;('style' !== r && 'object' == typeof o) || (e[r] = o)
      }),
      lo('path', no({}, e))
    )
  }
  function Ib(t) {
    var e = t.x,
      n = void 0 === e ? 0 : e,
      r = t.y,
      o = void 0 === r ? 0 : r,
      i = t.r,
      a = void 0 === i ? 4 : i,
      s = t.className,
      u = {
        cx: n,
        cy: o,
        r: a,
        fill: 'transparent',
        fillOpacity: 1,
        strokeWidth: 1,
        stroke: '#000',
        strokeOpacity: 1
      }
    return (
      Fp(Qp(t), function (t) {
        var e = ao(t, 2),
          n = e[0],
          r = e[1]
        'object' != typeof r && (u[n] = r)
      }),
      (u.className = s ? 'lf-basic-shape '.concat(s) : 'lf-basic-shape'),
      lo('circle', no({}, u))
    )
  }
  function Lb(t) {
    var e = t.x,
      n = void 0 === e ? 0 : e,
      r = t.y,
      o = void 0 === r ? 0 : r,
      i = t.rx,
      a = void 0 === i ? 4 : i,
      s = t.ry,
      u = void 0 === s ? 4 : s,
      l = t.className,
      c = {
        cx: n,
        cy: o,
        rx: a,
        ry: u,
        fill: 'transparent',
        fillOpacity: 1,
        strokeWidth: 1,
        stroke: '#000',
        strokeOpacity: 1
      }
    return (
      Fp(Qp(t), function (t) {
        var e = ao(t, 2),
          n = e[0],
          r = e[1]
        'object' != typeof r && (c[n] = r)
      }),
      (c.className = l ? 'lf-basic-shape '.concat(l) : 'lf-basic-shape'),
      lo('ellipse', no({}, c))
    )
  }
  function jb(t) {
    var e = t.points,
      n = void 0 === e ? [] : e,
      r = t.className,
      o = {
        fill: 'transparent',
        fillOpacity: 1,
        strokeWidth: 1,
        stroke: '#000',
        strokeOpacity: 1,
        points: ''
      }
    return (
      Fp(Qp(t), function (t) {
        var e = ao(t, 2),
          n = e[0],
          r = e[1]
        'object' != typeof r && (o[n] = r)
      }),
      r
        ? (o.classNmae = 'lf-basic-shape '.concat(r))
        : (o.className = 'lf-basic-shape'),
      (o.points = n
        .map(function (t) {
          return t.join(',')
        })
        .join(' ')),
      lo('polygon', no({}, o))
    )
  }
  function Rb(t) {
    var e = t.className,
      n = { points: '', fill: 'none' }
    return (
      Fp(Qp(t), function (t) {
        var e = ao(t, 2),
          r = e[0],
          o = e[1]
        ;('style' === r || 'object' != typeof o) && (n[r] = o)
      }),
      e && (n.className = ''.concat(e)),
      lo('polyline', no({}, n))
    )
  }
  !(function (t) {
    ;(t[(t.LEFT_TOP = 0)] = 'LEFT_TOP'),
      (t[(t.RIGHT_TOP = 1)] = 'RIGHT_TOP'),
      (t[(t.RIGHT_BOTTOM = 2)] = 'RIGHT_BOTTOM'),
      (t[(t.LEFT_BOTTOM = 3)] = 'LEFT_BOTTOM')
  })(Eb || (Eb = {}))
  var kb = (function (e) {
      function n(n) {
        var r = e.call(this) || this
        ;(r.updateEdgePointByAnchors = function () {
          var t = r.nodeModel,
            e = t.id,
            n = t.anchors
          Fp(r.graphModel.getNodeEdges(e), function (t) {
            if (t.sourceNodeId === e)
              (r = vh(n, function (e) {
                return e.id === t.sourceAnchorId
              })) && t.updateStartPoint({ x: r.x, y: r.y })
            else if (t.targetNodeId === e) {
              var r
              ;(r = vh(n, function (e) {
                return e.id === t.targetAnchorId
              })) && t.updateEndPoint({ x: r.x, y: r.y })
            }
          })
        }),
          (r.triggerResizeEvent = function (e, n, o, i, a, s) {
            r.graphModel.eventCenter.emit(t.EventType.NODE_RESIZE, {
              preData: e,
              data: n,
              deltaX: o,
              deltaY: i,
              index: a,
              model: s
            })
          }),
          (r.recalcResizeInfo = function (t, e, n, r, o) {
            void 0 === n && (n = 1),
              void 0 === r && (r = !1),
              void 0 === o && (o = !1)
            var i = ld(e),
              a = i.deltaX,
              s = i.deltaY,
              u = i.width,
              l = i.height,
              c = i.PCTResizeInfo
            if (c) {
              var d = 0,
                p = 0
              switch (t) {
                case Eb.LEFT_TOP:
                  p = (-1 * a - s) / 4
                  break
                case Eb.RIGHT_TOP:
                  p = (a - s) / 4
                  break
                case Eb.RIGHT_BOTTOM:
                  p = (a + s) / 4
                  break
                case Eb.LEFT_BOTTOM:
                  p = (-1 * a + s) / 4
              }
              0 !== p &&
                (d = Math.round((p / c.ResizeBasis.basisHeight) * 1e5) / 1e3),
                (c.ResizePCT.widthPCT = Math.max(
                  Math.min(
                    c.ResizePCT.widthPCT + d,
                    c.ScaleLimit.maxScaleLimit
                  ),
                  c.ScaleLimit.minScaleLimit
                )),
                (c.ResizePCT.heightPCT = Math.max(
                  Math.min(
                    c.ResizePCT.heightPCT + d,
                    c.ScaleLimit.maxScaleLimit
                  ),
                  c.ScaleLimit.minScaleLimit
                ))
              var h = Math.round(
                  (c.ResizePCT.widthPCT * c.ResizeBasis.basisWidth) / 100
                ),
                f = Math.round(
                  (c.ResizePCT.heightPCT * c.ResizeBasis.basisHeight) / 100
                )
              switch (t) {
                case Eb.LEFT_TOP:
                  ;(a = u - h), (s = l - f)
                  break
                case Eb.RIGHT_TOP:
                  ;(a = h - u), (s = l - f)
                  break
                case Eb.RIGHT_BOTTOM:
                  ;(a = h - u), (s = f - l)
                  break
                case Eb.LEFT_BOTTOM:
                  ;(a = u - h), (s = f - l)
              }
              return i
            }
            switch (t) {
              case Eb.LEFT_TOP:
                ;(i.width = r ? u : u - a * n), (i.height = o ? l : l - s * n)
                break
              case Eb.RIGHT_TOP:
                ;(i.width = r ? u : u + a * n), (i.height = o ? l : l - s * n)
                break
              case Eb.RIGHT_BOTTOM:
                ;(i.width = r ? u : u + a * n), (i.height = o ? l : l + s * n)
                break
              case Eb.LEFT_BOTTOM:
                ;(i.width = r ? u : u - a * n), (i.height = o ? l : l + s * n)
            }
            return i
          }),
          (r.resizeNode = function (t) {
            var e = t.deltaX,
              n = t.deltaY,
              o = r.index,
              i = r.props,
              a = i.model,
              s = i.graphModel,
              u = i.x,
              l = i.y
            Wb({
              x: u,
              y: l,
              deltaX: e,
              deltaY: n,
              index: o,
              nodeModel: a,
              graphModel: s,
              cancelCallback: function () {
                r.dragHandler.cancelDrag()
              }
            })
          }),
          (r.onDragging = function (t) {
            var e = t.deltaX,
              n = t.deltaY,
              o = ao(r.graphModel.transformModel.fixDeltaXY(e, n), 2),
              i = o[0],
              a = o[1]
            r.resizeNode({ deltaX: i, deltaY: a })
          }),
          (r.onDragEnd = function () {
            var t = r.nodeModel.x,
              e = r.nodeModel.y
            r.nodeModel.moveTo(t, e), r.updateEdgePointByAnchors()
          })
        var o = n.index,
          i = n.model,
          a = n.graphModel
        return (
          (r.index = o),
          (r.nodeModel = i),
          (r.graphModel = a),
          (r.dragHandler = new E_({
            onDragging: r.onDragging,
            onDragEnd: r.onDragEnd,
            step: a.gridSize
          })),
          r
        )
      }
      return (
        eo(n, e),
        (n.prototype.componentWillUnmount = function () {
          this.dragHandler.destroy()
        }),
        (n.prototype.render = function () {
          var t = this.props,
            e = t.x,
            n = t.y,
            r = t.direction,
            o = t.model.getResizeControlStyle(),
            i = o.width,
            a = o.height,
            s = ro(o, ['width', 'height'])
          return lo('g', {
            className: 'lf-resize-control lf-resize-control-'.concat(r),
            children: [
              lo(
                Pb,
                no(
                  {
                    className: 'lf-resize-control-content',
                    x: e,
                    y: n,
                    width: null != i ? i : 7,
                    height: null != a ? a : 7
                  },
                  s
                )
              ),
              lo(Pb, {
                className: 'lf-resize-control-content',
                x: e,
                y: n,
                width: 25,
                height: 25,
                fill: 'transparent',
                stroke: 'transparent',
                onMouseDown: this.dragHandler.handleMouseDown
              })
            ]
          })
        }),
        n
      )
    })(Fn),
    Bb = (function (t) {
      function e() {
        return t.call(this) || this
      }
      return (
        eo(e, t),
        (e.prototype.getResizeControl = function () {
          var t = this.props,
            e = t.model,
            n = t.graphModel,
            r = Wm(e),
            o = r.minX,
            i = r.minY,
            a = r.maxX,
            s = r.maxY
          return Mh(
            [
              { index: Eb.LEFT_TOP, direction: 'nw', x: o, y: i },
              { index: Eb.RIGHT_TOP, direction: 'ne', x: a, y: i },
              { index: Eb.RIGHT_BOTTOM, direction: 'se', x: a, y: s },
              { index: Eb.LEFT_BOTTOM, direction: 'sw', x: o, y: s }
            ],
            function (t) {
              return lo(kb, no({}, t, { model: e, graphModel: n }))
            }
          )
        }),
        (e.prototype.getResizeOutline = function () {
          var t = this.props.model,
            e = t.x,
            n = t.y,
            r = t.width,
            o = t.height,
            i = t.getResizeOutlineStyle()
          return lo(Pb, no({}, i, { x: e, y: n, width: r, height: o }))
        }),
        (e.prototype.render = function () {
          return lo('g', {
            className: 'lf-resize-control-group',
            children: [this.getResizeOutline(), this.getResizeControl()]
          })
        }),
        e
      )
    })(Fn)
  function zb(t, e, n) {
    var r = (function (t) {
        return (t * Math.PI) / 180
      })(n),
      o = t.x - e.x,
      i = t.y - e.y
    return {
      x: o * Math.cos(r) - i * Math.sin(r) + e.x,
      y: o * Math.sin(r) + i * Math.cos(r) + e.y
    }
  }
  function Ub(t, e, n, r, o, i, a, s, u) {
    void 0 === s && (s = !1), void 0 === u && (u = !1)
    var l = e.deltaX,
      c = e.deltaY,
      d = e.width,
      p = e.height,
      h = (n / Math.PI) * 180,
      f = { x: i, y: a },
      v = zb({ x: r, y: o }, f, h),
      y = Yb(v, { x: v.x + l, y: v.y + c }, f, h, s, u, d, p),
      g = y.width,
      _ = y.height,
      m = y.center
    return (
      (e.width = g * t),
      (e.height = _ * t),
      (e.deltaX = 2 * (m.x - f.x)),
      (e.deltaY = 2 * (m.y - f.y)),
      e
    )
  }
  var Hb = function (t, e, n, r, o, i, a, s, u, l) {
      void 0 === n && (n = 1),
        void 0 === r && (r = !1),
        void 0 === o && (o = !1),
        void 0 === i && (i = 0)
      var c = ld(e),
        d = c.deltaX,
        p = c.deltaY,
        h = c.width,
        f = c.height,
        v = c.PCTResizeInfo
      if (v) {
        var y = 0,
          g = 0
        switch (t) {
          case Eb.LEFT_TOP:
            g = (-1 * d - p) / 4
            break
          case Eb.RIGHT_TOP:
            g = (d - p) / 4
            break
          case Eb.RIGHT_BOTTOM:
            g = (d + p) / 4
            break
          case Eb.LEFT_BOTTOM:
            g = (-1 * d + p) / 4
        }
        0 !== g &&
          (y = Math.round((g / v.ResizeBasis.basisHeight) * 1e5) / 1e3),
          (v.ResizePCT.widthPCT = Math.max(
            Math.min(v.ResizePCT.widthPCT + y, v.ScaleLimit.maxScaleLimit),
            v.ScaleLimit.minScaleLimit
          )),
          (v.ResizePCT.heightPCT = Math.max(
            Math.min(v.ResizePCT.heightPCT + y, v.ScaleLimit.maxScaleLimit),
            v.ScaleLimit.minScaleLimit
          ))
        var _ = Math.round(
            (v.ResizePCT.widthPCT * v.ResizeBasis.basisWidth) / 100
          ),
          m = Math.round(
            (v.ResizePCT.heightPCT * v.ResizeBasis.basisHeight) / 100
          )
        switch (t) {
          case Eb.LEFT_TOP:
            ;(d = h - _), (p = f - m)
            break
          case Eb.RIGHT_TOP:
            ;(d = _ - h), (p = f - m)
            break
          case Eb.RIGHT_BOTTOM:
            ;(d = _ - h), (p = m - f)
            break
          case Eb.LEFT_BOTTOM:
            ;(d = h - _), (p = m - f)
        }
        return c
      }
      if (i % (2 * Math.PI) != 0 && void 0 !== a && void 0 !== s)
        return Ub(n, c, i, a, s, u, l, r, o)
      switch (t) {
        case Eb.LEFT_TOP:
          ;(c.width = r ? h : h - d * n), (c.height = o ? f : f - p * n)
          break
        case Eb.RIGHT_TOP:
          ;(c.width = r ? h : h + d * n), (c.height = o ? f : f - p * n)
          break
        case Eb.RIGHT_BOTTOM:
          ;(c.width = r ? h : h + d * n), (c.height = o ? f : f + p * n)
          break
        case Eb.LEFT_BOTTOM:
          ;(c.width = r ? h : h - d * n), (c.height = o ? f : f + p * n)
      }
      return c
    },
    Xb = function (t, e) {
      var n = t.id,
        r = t.anchors
      Fp(e.getNodeEdges(n), function (t) {
        if (t.sourceNodeId === n)
          (e = vh(r, function (e) {
            return e.id === t.sourceAnchorId
          })) && t.updateStartPoint({ x: e.x, y: e.y })
        else if (t.targetNodeId === n) {
          var e
          ;(e = vh(r, function (e) {
            return e.id === t.targetAnchorId
          })) && t.updateEndPoint({ x: e.x, y: e.y })
        }
      })
    },
    Gb = function (e, n, r, o, i, a, s) {
      s.eventCenter.emit(t.EventType.NODE_RESIZE, {
        preData: e,
        data: n,
        deltaX: r,
        deltaY: o,
        index: i,
        model: a
      })
    },
    Wb = function (t) {
      var e = t.x,
        n = t.y,
        r = t.deltaX,
        o = t.deltaY,
        i = t.index,
        a = t.nodeModel,
        s = t.graphModel,
        u = t.cancelCallback,
        l = a.r,
        c = a.rx,
        d = a.ry,
        p = a.width,
        h = a.height,
        f = a.PCTResizeInfo,
        v = a.minWidth,
        y = a.minHeight,
        g = a.maxWidth,
        _ = a.maxHeight,
        m = a.rotate,
        b = a.x,
        x = a.y,
        E = v === g,
        M = y === _,
        T = e,
        S = n,
        w = Hb(
          i,
          {
            width: l || c || p,
            height: l || d || h,
            deltaX: r,
            deltaY: o,
            PCTResizeInfo: f
          },
          l || (c && d) ? 0.5 : 1,
          E,
          M,
          m,
          T,
          S,
          b,
          x
        )
      if (w.width < v || w.width > g || w.height < y || w.height > _)
        null == u || u()
      else {
        ;(m % (2 * Math.PI) == 0 || f || void 0 === T || void 0 === S) &&
          ((w.deltaX = E ? 0 : w.deltaX), (w.deltaY = M ? 0 : w.deltaY))
        var A = a.getData(),
          O = a.resize(w)
        ;(A.x === O.x && A.y === O.y) || (Xb(a, s), Gb(A, O, r, o, i, a, s))
      }
    }
  function Yb(t, e, n, r, o, i, a, s) {
    void 0 === o && (o = !1), void 0 === i && (i = !1)
    var u,
      l,
      c,
      d,
      p = { x: n.x - (t.x - n.x), y: n.y - (t.y - n.y) },
      h =
        ((l = e),
        (c = (u = p).x),
        (d = u.y),
        { x: c + (l.x - c) / 2, y: d + (l.y - d) / 2 }),
      f = zb(e, h, -r),
      v = zb(p, h, -r)
    if (o) {
      var y = Math.abs(f.x - v.x) - a
      h.x > f.x ? (h.x = h.x + y / 2) : (h.x = h.x - y / 2)
    }
    if (i) {
      var g = Math.abs(f.y - v.y) - s
      h.y > f.y ? (h.y = h.y + g / 2) : (h.y = h.y - g / 2)
    }
    if (o || i) {
      var _ = zb(v, h, r),
        m = _.x - p.x,
        b = _.y - p.y
      ;(h.x = h.x - m),
        (h.y = h.y - b),
        (v = zb(p, h, -r)),
        (f = { x: h.x - (v.x - h.x), y: h.y - (v.y - h.y) })
    }
    var x = Math.abs(f.x - v.x),
      E = Math.abs(f.y - v.y)
    return o && (x = a), i && (E = s), { width: x, height: E, center: h }
  }
  var Fb = 100,
    Vb = { x: 1, y: 0, z: 0 }
  function Kb(t, e, n, r, o) {
    for (
      var i = function (o) {
          if (o < 0 || o > 1)
            throw new RangeError('The value range of parameter "t" is [0,1]')
          return {
            x:
              t.x * Math.pow(1 - o, 3) +
              3 * e.x * o * Math.pow(1 - o, 2) +
              3 * n.x * Math.pow(o, 2) * (1 - o) +
              r.x * Math.pow(o, 3),
            y:
              t.y * Math.pow(1 - o, 3) +
              3 * e.y * o * Math.pow(1 - o, 2) +
              3 * n.y * Math.pow(o, 2) * (1 - o) +
              r.y * Math.pow(o, 3)
          }
        },
        a = 0,
        s = 2,
        u = r.x,
        l = r.y,
        c = r;
      a < o && s < 50;

    ) {
      var d = (c = i(1 - s / Fb)).x,
        p = c.y
      ;(a = Hm(u, l, d, p)), s++
    }
    return c
  }
  function qb(t) {
    var e = Math.hypot(t.x, t.y)
    return { x: t.x / e, y: t.y / e, z: 0 }
  }
  function Zb(t) {
    return (function (t, e) {
      var n = (function (t, e) {
          return t.x * e.y - t.y * e.x
        })(t, e),
        r = Math.acos(
          (function (t, e) {
            var n = [t.x, t.y, t.z]
            return [e.x, e.y, e.z].reduce(function (t, e, r) {
              return t + e * n[r]
            })
          })(qb(t), qb(e))
        )
      return n >= 0 ? r : -r
    })(Vb, t)
  }
  function $b(t) {
    return t * (180 / Math.PI)
  }
  var Jb = {
      baseNode: { fill: '#fff', stroke: '#000', strokeWidth: 2 },
      baseEdge: { stroke: '#000', strokeWidth: 2 },
      rect: {},
      circle: {},
      diamond: {},
      ellipse: {},
      polygon: {},
      text: {
        color: '#000',
        stroke: 'none',
        fontSize: 12,
        background: { fill: 'transparent' }
      },
      anchor: {
        stroke: '#000',
        fill: '#fff',
        r: 4,
        hover: { r: 10, fill: '#949494', fillOpacity: 0.5, stroke: '#949494' }
      },
      anchorLine: { stroke: '#000', strokeWidth: 2, strokeDasharray: '3,2' },
      nodeText: {
        color: '#000',
        overflowMode: 'default',
        fontSize: 12,
        lineHeight: 1.2
      },
      edgeText: {
        textWidth: 100,
        overflowMode: 'default',
        fontSize: 12,
        background: { fill: '#fff' }
      },
      line: {},
      polyline: {},
      bezier: {
        fill: 'none',
        adjustLine: { stroke: '#949494' },
        adjustAnchor: {
          r: 4,
          fill: '#949494',
          fillOpacity: 1,
          stroke: '#949494'
        }
      },
      arrow: { offset: 10, verticalLength: 5 },
      snapline: { stroke: '#949494', strokeWidth: 1 },
      edgeAdjust: { r: 4, fill: '#fff', stroke: '#949494', strokeWidth: 2 },
      outline: {
        fill: 'transparent',
        stroke: '#949494',
        strokeDasharray: '3,3',
        hover: { stroke: '#949494' }
      },
      edgeAnimation: {
        stroke: 'red',
        strokeDasharray: '10,10',
        strokeDashoffset: '100%',
        animationName: 'lf_animate_dash',
        animationDuration: '20s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        animationDirection: 'normal'
      },
      rotateControl: { stroke: '#000', fill: '#fff', strokeWidth: 1.5 },
      resizeControl: { width: 7, height: 7, fill: '#fff', stroke: '#000' },
      resizeOutline: {
        fill: 'none',
        stroke: 'transparent',
        strokeWidth: 1,
        strokeDasharray: '3,3'
      }
    },
    Qb = function (t) {
      var e = ld(Jb)
      return t && (e = Kf(e, t)), e
    },
    tx = Qb,
    ex = 1e3,
    nx = 999,
    rx = function () {
      return ++ex
    },
    ox = function () {
      return --nx
    },
    ix = Object.freeze({
      __proto__: null,
      Matrix: Im,
      Point: Cm,
      RotateMatrix: Lm,
      ScaleMatrix: jm,
      StepDrag: E_,
      TranslateMatrix: Rm,
      Vector: Pm,
      action: te,
      calculateWidthAndHeight: Yb,
      cancelRaf: Ab,
      computed: rt,
      configure: ce,
      costByPoints: F_,
      createEdgeGenerator: Em,
      createRaf: wb,
      createUuid: Mb,
      defaultAnimationOffConfig: u_,
      defaultAnimationOnConfig: l_,
      defaultTheme: Jb,
      degrees: $b,
      distance: Hm,
      estimateDistance: Y_,
      filterRepeatPoints: I_,
      formatAnchorConnectValidateData: nb,
      formatData: h_,
      getAnchors: km,
      getAppendAttributes: fm,
      getBBoxCrossPointsByPoint: W_,
      getBBoxOfPoints: z_,
      getBBoxXCrossPoints: X_,
      getBBoxYCrossPoints: G_,
      getBezierControlPoints: vm,
      getBezierPoints: ym,
      getBoxByOriginNode: tm,
      getBytesLength: dm,
      getClosestAnchor: Um,
      getClosestPointOfPolyline: mm,
      getClosestRadiusCenter: Fm,
      getCrossPointInRect: am,
      getCrossPointWithCircle: Vm,
      getCrossPointWithEllipse: Zm,
      getCrossPointWithPolygon: $m,
      getEndTangent: _m,
      getExpandedBBox: j_,
      getExpandedBBoxPoint: k_,
      getGridOffset: Sm,
      getHtmlTextHeight: tb,
      getLongestEdge: rm,
      getMinIndex: ox,
      getNextNeighborPoints: J_,
      getNodeAnchorPosition: Qm,
      getNodeBBox: Wm,
      getPointsFromBBox: U_,
      getPolylinePoints: nm,
      getRectRadiusCircle: Ym,
      getSimplePoints: lm,
      getSimplePolyline: L_,
      getSvgTextSize: Mm,
      getSvgTextWidthHeight: eb,
      getTextWidth: hm,
      getThetaOfVector: Zb,
      getZIndex: rx,
      handleResize: Wb,
      heuristicCostEstimate: V_,
      inStraightLineOfRect: qm,
      isBboxOverLapping: C_,
      isIe: p_,
      isInNode: Xm,
      isInNodeBbox: Gm,
      isMultipleSelect: Om,
      isObservable: Te,
      isPointInArea: Am,
      isPointOutsideBBox: H_,
      isSegmentCrossingBBox: $_,
      isSegmentsCrossNode: im,
      isSegmentsInNode: om,
      isSegmentsIntersected: Z_,
      mergeBBox: B_,
      normalizePolygon: wm,
      observable: $,
      pathFinder: Q_,
      pickEdgeConfig: bm,
      pickNodeConfig: Jm,
      pointDirection: R_,
      pointEdgeDirection: Km,
      pointFilter: em,
      points2PointsList: um,
      reaction: ae,
      rebuildPath: K_,
      recalcResizeInfo: Hb,
      refreshGraphId: Tb,
      removeClosePointFromOpenList: q_,
      sampleCubic: Kb,
      segmentDirection: sm,
      setupAnimation: c_,
      setupEdgeModel: P_,
      setupTheme: Qb,
      snapToGrid: Tm,
      targetNodeInfo: Bm,
      toJS: Le,
      triggerResizeEvent: Gb,
      twoPointDistance: xm,
      updateAnimation: d_,
      updateEdgePointByAnchors: Xb,
      updateTheme: tx
    }),
    ax = (function () {
      function e(e, n) {
        var r
        ;(this.BaseType = t.ElementType.EDGE),
          (this.id = ''),
          (this.type = ''),
          (this.sourceNodeId = ''),
          (this.targetNodeId = ''),
          (this.textMode = t.TextMode.TEXT),
          (this.text = { value: '', x: 0, y: 0, draggable: !1, editable: !0 }),
          (this.points = ''),
          (this.pointsList = []),
          (this.virtual = !1),
          (this.isSelected = !1),
          (this.isHovered = !1),
          (this.isHitable = !0),
          (this.isHittable = !0),
          (this.draggable = !0),
          (this.visible = !0),
          (this.isAnimation = !1),
          (this.isShowAdjustPoint = !1),
          (this.zIndex = 0),
          (this.state = t.ElementState.DEFAULT),
          (this.modelType = t.ModelType.EDGE),
          (this.customTextPosition = !1),
          (this.style = {}),
          (this.arrowConfig = {
            markerEnd: 'url(#marker-end-'.concat(this.id, ')'),
            markerStart: 'url(#marker-start-'.concat(this.id, ')')
          }),
          (this.graphModel = n),
          (this.properties =
            null !== (r = e.properties) && void 0 !== r ? r : {}),
          this.initEdgeData(e),
          this.setAttributes()
      }
      return (
        (e.prototype.initEdgeData = function (e) {
          if ((e.properties || (e.properties = {}), !e.id)) {
            var n = this.graphModel.idGenerator,
              r = n && n(e.type),
              o = this.createId()
            e.id = o || r || Mb()
          }
          ;(this.arrowConfig.markerEnd = 'url(#marker-end-'.concat(e.id, ')')),
            (this.arrowConfig.markerStart = 'url(#marker-start-'.concat(
              e.id,
              ')'
            ))
          var i = this.graphModel.editConfigModel.adjustEdgeStartAndEnd
          ;(this.isShowAdjustPoint = i),
            js(this, bm(e)),
            this.graphModel.overlapMode === t.OverlapMode.INCREASE &&
              (this.zIndex = e.zIndex || rx()),
            this.setAnchors(),
            this.initPoints(),
            this.formatText(e)
        }),
        (e.prototype.setAttributes = function () {}),
        (e.prototype.createId = function () {
          return null
        }),
        (e.prototype.getEdgeStyle = function () {
          return no(no({}, this.graphModel.theme.baseEdge), this.style)
        }),
        (e.prototype.getAdjustPointStyle = function () {
          return no({}, this.graphModel.theme.edgeAdjust)
        }),
        (e.prototype.getTextStyle = function () {
          return ld(this.graphModel.theme.edgeText)
        }),
        (e.prototype.getEdgeAnimationStyle = function () {
          return ld(this.graphModel.theme.edgeAnimation)
        }),
        (e.prototype.getArrowStyle = function () {
          var t = this.getEdgeStyle(),
            e = this.getEdgeAnimationStyle(),
            n = this.graphModel.theme.arrow,
            r = this.isAnimation ? e.stroke : t.stroke
          return no(no(no({}, t), { fill: r, stroke: r }), n)
        }),
        (e.prototype.getOutlineStyle = function () {
          return ld(this.graphModel.theme.outline)
        }),
        (e.prototype.getTextPosition = function () {
          return { x: 0, y: 0 }
        }),
        Object.defineProperty(e.prototype, 'sourceNode', {
          get: function () {
            var t, e
            return null ===
              (e =
                null === (t = this.graphModel) || void 0 === t
                  ? void 0
                  : t.nodesMap[this.sourceNodeId]) || void 0 === e
              ? void 0
              : e.model
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'targetNode', {
          get: function () {
            var t, e
            return null ===
              (e =
                null === (t = this.graphModel) || void 0 === t
                  ? void 0
                  : t.nodesMap[this.targetNodeId]) || void 0 === e
              ? void 0
              : e.model
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'textPosition', {
          get: function () {
            return this.getTextPosition()
          },
          enumerable: !1,
          configurable: !0
        }),
        (e.prototype.getBeginAnchor = function (t, e, n) {
          var r,
            o,
            i = km(t)
          return (
            (n &&
              (r = vh(i, function (t) {
                return t.id === n
              }))) ||
              i.forEach(function (t) {
                var n = xm(t, e)
                ;(void 0 === o || n < o) && ((o = n), (r = t))
              }),
            r
          )
        }),
        (e.prototype.getEndAnchor = function (t, e) {
          var n,
            r,
            o = this,
            i = km(t)
          return (
            (e &&
              (n = vh(i, function (t) {
                return t.id === e
              }))) ||
              i.forEach(function (t) {
                if (o.startPoint) {
                  var e = xm(t, o.startPoint)
                  ;(void 0 === r || e < r) && ((r = e), (n = t))
                }
              }),
            n
          )
        }),
        (e.prototype.getProperties = function () {
          return Le(this.properties)
        }),
        (e.prototype.getData = function () {
          var e = this.properties
          Te(e) && (e = Le(e))
          var n = {
            id: this.id,
            type: this.type,
            properties: e,
            sourceNodeId: this.sourceNodeId,
            targetNodeId: this.targetNodeId,
            sourceAnchorId: this.sourceAnchorId,
            targetAnchorId: this.targetAnchorId,
            startPoint: js({}, this.startPoint),
            endPoint: js({}, this.endPoint)
          }
          this.graphModel.overlapMode === t.OverlapMode.INCREASE &&
            (n.zIndex = this.zIndex)
          var r = this.text,
            o = r.x,
            i = r.y,
            a = r.value
          return a && (n.text = { x: o, y: i, value: a }), n
        }),
        (e.prototype.getHistoryData = function () {
          return this.getData()
        }),
        (e.prototype.setProperty = function (t, e) {
          Oe(this.properties, t, h_(e)), this.setAttributes()
        }),
        (e.prototype.deleteProperty = function (t) {
          delete this.properties[t], this.setAttributes()
        }),
        (e.prototype.setProperties = function (t) {
          ;(this.properties = no(no({}, Le(this.properties)), h_(t))),
            this.setAttributes()
        }),
        (e.prototype.changeEdgeId = function (t) {
          var e = this.arrowConfig,
            n = e.markerEnd,
            r = e.markerStart
          r &&
            r === 'url(#marker-start-'.concat(this.id, ')') &&
            (this.arrowConfig.markerStart = 'url(#marker-start-'.concat(
              t,
              ')'
            )),
            n &&
              n === 'url(#marker-end-'.concat(this.id, ')') &&
              (this.arrowConfig.markerEnd = 'url(#marker-end-'.concat(t, ')')),
            (this.id = t)
        }),
        (e.prototype.setStyle = function (t, e) {
          var n
          this.style = no(no({}, this.style), (((n = {})[t] = h_(e)), n))
        }),
        (e.prototype.setStyles = function (t) {
          this.style = no(no({}, this.style), h_(t))
        }),
        (e.prototype.updateStyles = function (t) {
          this.style = no({}, h_(t))
        }),
        (e.prototype.setTextMode = function (t) {
          this.textMode = t
        }),
        (e.prototype.formatText = function (t) {
          var e,
            n,
            r,
            o = this.graphModel.editConfigModel,
            i = o.edgeTextDraggable,
            a = o.edgeTextEdit,
            s = this.textPosition,
            u = s.x,
            l = s.y,
            c = t.text,
            d = { value: '', x: u, y: l, draggable: i, editable: a }
          c &&
            ('string' == typeof c
              ? (d = no(no({}, d), { value: c }))
              : ((d = no(no({}, d), {
                  x: null !== (e = c.x) && void 0 !== e ? e : u,
                  y: null !== (n = c.y) && void 0 !== n ? n : l,
                  value: null !== (r = c.value) && void 0 !== r ? r : ''
                })),
                Cf(c.draggable) || (d.draggable = c.draggable),
                Cf(c.editable) || (d.editable = c.editable))),
            (this.text = d)
        }),
        (e.prototype.resetTextPosition = function () {
          var t = this.textPosition,
            e = t.x,
            n = t.y
          ;(this.text.x = e), (this.text.y = n)
        }),
        (e.prototype.moveText = function (t, e) {
          var n = this.text,
            r = n.x,
            o = n.y,
            i = n.value,
            a = n.draggable,
            s = n.editable
          this.text = {
            value: i,
            editable: s,
            draggable: a,
            x: r + t,
            y: o + e
          }
        }),
        (e.prototype.setText = function (t) {
          t && js(this.text, t)
        }),
        (e.prototype.updateText = function (t) {
          this.text = no(no({}, Le(this.text)), { value: t })
        }),
        (e.prototype.setAnchors = function () {
          if (!this.sourceAnchorId || !this.startPoint) {
            if (
              !(t = this.getBeginAnchor(
                this.sourceNode,
                this.targetNode,
                this.sourceAnchorId
              ))
            )
              throw new Error(
                '无法获取beginAnchor，请检查anchors相关逻辑，anchors不能为空'
              )
            this.startPoint || (this.startPoint = { x: t.x, y: t.y }),
              this.sourceAnchorId || (this.sourceAnchorId = t.id)
          }
          if (!this.targetAnchorId || !this.endPoint) {
            var t
            if (!(t = this.getEndAnchor(this.targetNode, this.targetAnchorId)))
              throw new Error(
                '无法获取endAnchor，请检查anchors相关逻辑，anchors不能为空'
              )
            this.endPoint || (this.endPoint = { x: t.x, y: t.y }),
              this.targetAnchorId || (this.targetAnchorId = t.id)
          }
        }),
        (e.prototype.setSelected = function (t) {
          void 0 === t && (t = !0), (this.isSelected = t)
        }),
        (e.prototype.setHovered = function (t) {
          void 0 === t && (t = !0), (this.isHovered = t)
        }),
        (e.prototype.setHitable = function (t) {
          void 0 === t && (t = !0), (this.isHitable = t)
        }),
        (e.prototype.setHittable = function (t) {
          void 0 === t && (t = !0), (this.isHittable = t)
        }),
        (e.prototype.openEdgeAnimation = function () {
          this.isAnimation = !0
        }),
        (e.prototype.closeEdgeAnimation = function () {
          this.isAnimation = !1
        }),
        (e.prototype.setElementState = function (t, e) {
          ;(this.state = t), (this.additionStateData = e)
        }),
        (e.prototype.updateStartPoint = function (t) {
          this.startPoint = t
        }),
        (e.prototype.moveStartPoint = function (t, e) {
          this.startPoint &&
            ((this.startPoint.x += t), (this.startPoint.y += e))
        }),
        (e.prototype.updateEndPoint = function (t) {
          this.endPoint = t
        }),
        (e.prototype.moveEndPoint = function (t, e) {
          this.endPoint && ((this.endPoint.x += t), (this.endPoint.y += e))
        }),
        (e.prototype.setZIndex = function (t) {
          void 0 === t && (t = 0), (this.zIndex = t)
        }),
        (e.prototype.initPoints = function () {}),
        (e.prototype.updateAttributes = function (t) {
          js(this, t)
        }),
        (e.prototype.getAdjustStart = function () {
          return this.startPoint
        }),
        (e.prototype.getAdjustEnd = function () {
          return this.endPoint
        }),
        (e.prototype.updateAfterAdjustStartAndEnd = function (t) {
          var e = t.startPoint,
            n = t.endPoint
          this.updateStartPoint({ x: e.x, y: e.y }),
            this.updateEndPoint({ x: n.x, y: n.y })
        }),
        (e.BaseType = t.ElementType.EDGE),
        oo([$], e.prototype, 'type', void 0),
        oo([$], e.prototype, 'sourceNodeId', void 0),
        oo([$], e.prototype, 'targetNodeId', void 0),
        oo([$], e.prototype, 'startPoint', void 0),
        oo([$], e.prototype, 'endPoint', void 0),
        oo([$], e.prototype, 'textMode', void 0),
        oo([$], e.prototype, 'text', void 0),
        oo([$], e.prototype, 'properties', void 0),
        oo([$], e.prototype, 'points', void 0),
        oo([$], e.prototype, 'pointsList', void 0),
        oo([$], e.prototype, 'isSelected', void 0),
        oo([$], e.prototype, 'isHovered', void 0),
        oo([$], e.prototype, 'isHitable', void 0),
        oo([$], e.prototype, 'isHittable', void 0),
        oo([$], e.prototype, 'draggable', void 0),
        oo([$], e.prototype, 'visible', void 0),
        oo([$], e.prototype, 'isAnimation', void 0),
        oo([$], e.prototype, 'isShowAdjustPoint', void 0),
        oo([$], e.prototype, 'zIndex', void 0),
        oo([$], e.prototype, 'state', void 0),
        oo([$], e.prototype, 'style', void 0),
        oo([$], e.prototype, 'arrowConfig', void 0),
        oo([rt], e.prototype, 'sourceNode', null),
        oo([rt], e.prototype, 'targetNode', null),
        oo([rt], e.prototype, 'textPosition', null),
        oo([te], e.prototype, 'setProperty', null),
        oo([te], e.prototype, 'deleteProperty', null),
        oo([te], e.prototype, 'setProperties', null),
        oo([te], e.prototype, 'changeEdgeId', null),
        oo([te], e.prototype, 'setStyle', null),
        oo([te], e.prototype, 'setStyles', null),
        oo([te], e.prototype, 'updateStyles', null),
        oo([te], e.prototype, 'setTextMode', null),
        oo([te], e.prototype, 'formatText', null),
        oo([te], e.prototype, 'resetTextPosition', null),
        oo([te], e.prototype, 'moveText', null),
        oo([te], e.prototype, 'setText', null),
        oo([te], e.prototype, 'updateText', null),
        oo([te], e.prototype, 'setAnchors', null),
        oo([te], e.prototype, 'setSelected', null),
        oo([te], e.prototype, 'setHovered', null),
        oo([te], e.prototype, 'setHitable', null),
        oo([te], e.prototype, 'setHittable', null),
        oo([te], e.prototype, 'openEdgeAnimation', null),
        oo([te], e.prototype, 'closeEdgeAnimation', null),
        oo([te], e.prototype, 'setElementState', null),
        oo([te], e.prototype, 'updateStartPoint', null),
        oo([te], e.prototype, 'moveStartPoint', null),
        oo([te], e.prototype, 'updateEndPoint', null),
        oo([te], e.prototype, 'moveEndPoint', null),
        oo([te], e.prototype, 'setZIndex', null),
        oo([te], e.prototype, 'initPoints', null),
        oo([te], e.prototype, 'updateAttributes', null),
        oo([te], e.prototype, 'getAdjustStart', null),
        oo([te], e.prototype, 'getAdjustEnd', null),
        oo([te], e.prototype, 'updateAfterAdjustStartAndEnd', null),
        e
      )
    })(),
    sx = (function (e) {
      function n(n, r) {
        var o = e.call(this, n, r) || this
        return (
          (o.modelType = t.ModelType.BEZIER_EDGE),
          (o.path = ''),
          o.initEdgeData(n),
          o.setAttributes(),
          o
        )
      }
      return (
        eo(n, e),
        (n.prototype.initEdgeData = function (t) {
          ;(this.offset = 100), e.prototype.initEdgeData.call(this, t)
        }),
        (n.prototype.getEdgeStyle = function () {
          var t = this.graphModel.theme.bezier,
            n = e.prototype.getEdgeStyle.call(this),
            r = this.properties.style,
            o = void 0 === r ? {} : r
          return no(no(no({}, n), ld(t)), ld(o))
        }),
        (n.prototype.getTextPosition = function () {
          if (this.pointsList && this.pointsList.length > 0) {
            var t = 0,
              e = 0
            return (
              this.pointsList.forEach(function (n) {
                var r = n.x,
                  o = n.y
                ;(t += r), (e += o)
              }),
              { x: t / this.pointsList.length, y: e / this.pointsList.length }
            )
          }
          return {
            x: (this.startPoint.x + this.endPoint.x) / 2,
            y: (this.startPoint.y + this.endPoint.y) / 2
          }
        }),
        (n.prototype.getData = function () {
          var t = e.prototype.getData.call(this),
            n = this.pointsList.map(function (t) {
              return { x: t.x, y: t.y }
            })
          return no(no({}, t), { pointsList: n })
        }),
        (n.prototype.getControls = function () {
          var t = this.startPoint,
            e = this.endPoint
          return vm({
            start: t,
            end: e,
            sourceNode: this.sourceNode,
            targetNode: this.targetNode,
            offset: this.offset
          })
        }),
        (n.prototype.getPath = function (t) {
          var e = ao(t, 4),
            n = e[0],
            r = e[1],
            o = e[2],
            i = e[3]
          return 'M '
            .concat(n.x, ' ')
            .concat(n.y, '\n    C ')
            .concat(r.x, ' ')
            .concat(r.y, ',\n    ')
            .concat(o.x, ' ')
            .concat(o.y, ',\n    ')
            .concat(i.x, ' ')
            .concat(i.y)
        }),
        (n.prototype.initPoints = function () {
          this.pointsList.length > 0
            ? (this.path = this.getPath(this.pointsList))
            : this.updatePoints()
        }),
        (n.prototype.updatePoints = function () {
          var t = this.getControls(),
            e = t.sNext,
            n = t.ePre
          this.updatePath(e, n)
        }),
        (n.prototype.updatePath = function (t, e) {
          ;(t = ld(t)), (e = ld(e))
          var n = { x: this.startPoint.x, y: this.startPoint.y },
            r = { x: this.endPoint.x, y: this.endPoint.y }
          if (!t || !e) {
            var o = this.getControls()
            ;(t = o.sNext), (e = o.ePre)
          }
          ;(this.pointsList = [n, t, e, r]),
            (this.path = this.getPath(this.pointsList))
        }),
        (n.prototype.updateStartPoint = function (t) {
          ;(this.startPoint = Object.assign({}, t)), this.updatePoints()
        }),
        (n.prototype.updateEndPoint = function (t) {
          ;(this.endPoint = Object.assign({}, t)), this.updatePoints()
        }),
        (n.prototype.moveStartPoint = function (t, e) {
          ;(this.startPoint.x += t), (this.startPoint.y += e)
          var n = ao(this.pointsList, 3),
            r = n[1],
            o = n[2]
          ;(r.x += t), (r.y += e), this.updatePath(r, o)
        }),
        (n.prototype.moveEndPoint = function (t, e) {
          ;(this.endPoint.x += t), (this.endPoint.y += e)
          var n = ao(this.pointsList, 3),
            r = n[1],
            o = n[2]
          ;(o.x += t), (o.y += e), this.updatePath(r, o)
        }),
        (n.prototype.updateAdjustAnchor = function (t, e) {
          var n
          'sNext' === e
            ? (this.pointsList[1] = t)
            : 'ePre' === e && (this.pointsList[2] = t),
            (this.path = this.getPath(this.pointsList)),
            (null === (n = this.text) || void 0 === n ? void 0 : n.value) &&
              this.setText(js({}, this.text, this.textPosition))
        }),
        (n.prototype.getAdjustStart = function () {
          return this.pointsList[0] || this.startPoint
        }),
        (n.prototype.getAdjustEnd = function () {
          var t = this.pointsList
          return t[t.length - 1] || this.endPoint
        }),
        (n.prototype.updateAfterAdjustStartAndEnd = function (t) {
          var e = t.startPoint,
            n = t.endPoint,
            r = t.sourceNode,
            o = t.targetNode,
            i = vm({
              start: e,
              end: n,
              sourceNode: r,
              targetNode: o,
              offset: this.offset
            }),
            a = i.sNext,
            s = i.ePre
          ;(this.pointsList = [e, a, s, n]), this.initPoints()
        }),
        oo([$], n.prototype, 'path', void 0),
        oo([te], n.prototype, 'initPoints', null),
        oo([te], n.prototype, 'updatePoints', null),
        oo([te], n.prototype, 'updateStartPoint', null),
        oo([te], n.prototype, 'updateEndPoint', null),
        oo([te], n.prototype, 'moveStartPoint', null),
        oo([te], n.prototype, 'moveEndPoint', null),
        oo([te], n.prototype, 'updateAdjustAnchor', null),
        oo([te], n.prototype, 'getAdjustStart', null),
        oo([te], n.prototype, 'getAdjustEnd', null),
        oo([te], n.prototype, 'updateAfterAdjustStartAndEnd', null),
        n
      )
    })(ax),
    ux = (function (e) {
      function n() {
        var n = e.apply(this, so([], ao(arguments), !1)) || this
        return (n.modelType = t.ModelType.LINE_EDGE), n
      }
      return (
        eo(n, e),
        (n.prototype.getEdgeStyle = function () {
          var t = this.graphModel.theme.line,
            n = e.prototype.getEdgeStyle.call(this),
            r = this.properties.style,
            o = void 0 === r ? {} : r
          return no(no(no({}, n), ld(t)), ld(o))
        }),
        (n.prototype.initEdgeData = function (t) {
          e.prototype.initEdgeData.call(this, t),
            (this.points = this.getPath([this.startPoint, this.endPoint]))
        }),
        (n.prototype.getPath = function (t) {
          var e = ao(t, 2),
            n = e[0],
            r = e[1]
          return ''
            .concat(n.x, ',')
            .concat(n.y, ' ')
            .concat(r.x, ',')
            .concat(r.y)
        }),
        (n.prototype.getTextPosition = function () {
          return {
            x: (this.startPoint.x + this.endPoint.x) / 2,
            y: (this.startPoint.y + this.endPoint.y) / 2
          }
        }),
        n
      )
    })(ax),
    lx = (function (e) {
      function n() {
        var n = e.apply(this, so([], ao(arguments), !1)) || this
        return (
          (n.modelType = t.ModelType.POLYLINE_EDGE),
          (n.draggingPointList = []),
          n
        )
      }
      return (
        eo(n, e),
        (n.prototype.initEdgeData = function (t) {
          ;(this.offset = 30),
            t.pointsList && (this.pointsList = t.pointsList),
            e.prototype.initEdgeData.call(this, t)
        }),
        (n.prototype.getEdgeStyle = function () {
          var t = this.graphModel.theme.polyline,
            n = e.prototype.getEdgeStyle.call(this),
            r = this.properties.style,
            o = void 0 === r ? {} : r
          return no(no(no({}, n), ld(t)), ld(o))
        }),
        (n.prototype.getTextPosition = function () {
          var t,
            e = null === (t = this.text) || void 0 === t ? void 0 : t.value
          if (this.dbClickPosition && !e) {
            var n = this.dbClickPosition
            return { x: n.x, y: n.y }
          }
          var r = um(this.points),
            o = ao(rm(r), 2),
            i = o[0],
            a = o[1]
          return { x: (i.x + a.x) / 2, y: (i.y + a.y) / 2 }
        }),
        (n.prototype.getAfterAnchor = function (e, n, r) {
          var o, i
          return (
            r.forEach(function (r) {
              var a
              e === t.SegmentDirection.HORIZONTAL
                ? (a = Math.abs(n.y - r.y))
                : e === t.SegmentDirection.VERTICAL &&
                  (a = Math.abs(n.x - r.x)),
                (!i || i > a) && ((i = a), (o = r))
            }),
            o
          )
        }),
        (n.prototype.getCrossPoint = function (e, n, r) {
          var o
          return (
            e === t.SegmentDirection.HORIZONTAL
              ? (o = { x: r.x, y: n.y })
              : e === t.SegmentDirection.VERTICAL && (o = { x: n.x, y: r.y }),
            o
          )
        }),
        (n.prototype.removeCrossPoints = function (t, e, n) {
          var r = n.map(function (t) {
            return t
          })
          if (1 === t) {
            var o = r[t],
              i = r[e],
              a = r[t - 1]
            if (om(a, o, this.sourceNode)) {
              if (im(o, i, this.sourceNode))
                (s = am(o, i, this.sourceNode)) &&
                  ((r[t] = s), r.splice(t - 1, 1), t--, e--)
            } else
              this.sourceNode.anchors.forEach(function (e) {
                ;((e.x === a.x && e.x === o.x) ||
                  (e.y === a.y && e.y === o.y)) &&
                  Hm(e.x, e.y, o.x, o.y) < Hm(a.x, a.y, o.x, o.y) &&
                  (r[t - 1] = e)
              })
          }
          if (e === n.length - 2) {
            var s,
              u = r[t],
              l = r[e],
              c = r[e + 1]
            if (om(l, c, this.targetNode)) {
              if (im(u, l, this.targetNode))
                (s = am(u, l, this.targetNode)) &&
                  ((r[e] = s), r.splice(e + 1, 1))
            } else
              this.targetNode.anchors.forEach(function (t) {
                ;((t.x === c.x && t.x === l.x) ||
                  (t.y === c.y && t.y === l.y)) &&
                  Hm(t.x, t.y, l.x, l.y) < Hm(c.x, c.y, l.x, l.y) &&
                  (r[e + 1] = t)
              })
          }
          return r
        }),
        (n.prototype.getDraggingPoints = function (t, e, n, r, o) {
          var i = o.map(function (t) {
              return t
            }),
            a = this.getAfterAnchor(t, n, r),
            s = this.getCrossPoint(t, n, a)
          return (
            'start' === e
              ? (i.unshift(s), i.unshift(a))
              : (i.push(s), i.push(a)),
            i
          )
        }),
        (n.prototype.updateCrossPoints = function (e) {
          var n = e.map(function (t) {
              return t
            }),
            r = e[0],
            o = e[1],
            i = e[n.length - 2],
            a = e[n.length - 1],
            s = this.sourceNode,
            u = this.targetNode,
            l = s.modelType,
            c = u.modelType,
            d = sm(r, o),
            p = n[0]
          switch (l) {
            case t.ModelType.RECT_NODE:
              if (0 !== s.radius) qm(r, s) || (p = Fm(r, d, s))
              break
            case t.ModelType.CIRCLE_NODE:
              p = Vm(r, d, s)
              break
            case t.ModelType.ELLIPSE_NODE:
              p = Zm(r, d, s)
              break
            case t.ModelType.DIAMOND_NODE:
            case t.ModelType.POLYGON_NODE:
              p = $m(r, d, s)
          }
          p && (n[0] = p)
          var h = sm(i, a),
            f = n[n.length - 1]
          switch (c) {
            case t.ModelType.RECT_NODE:
              if (0 !== u.radius) qm(a, u) || (f = Fm(a, h, u))
              break
            case t.ModelType.CIRCLE_NODE:
              f = Vm(a, h, u)
              break
            case t.ModelType.ELLIPSE_NODE:
              f = Zm(a, h, u)
              break
            case t.ModelType.DIAMOND_NODE:
            case t.ModelType.POLYGON_NODE:
              f = $m(a, h, u)
          }
          return f && (n[n.length - 1] = f), n
        }),
        (n.prototype.updatePath = function (t) {
          ;(this.pointsList = t), (this.points = this.getPath(this.pointsList))
        }),
        (n.prototype.getData = function () {
          var t = e.prototype.getData.call(this),
            n = this.pointsList.map(function (t) {
              return { x: t.x, y: t.y }
            })
          return Object.assign({}, t, { pointsList: n })
        }),
        (n.prototype.getPath = function (t) {
          return t
            .map(function (t) {
              return ''.concat(t.x, ',').concat(t.y)
            })
            .join(' ')
        }),
        (n.prototype.initPoints = function () {
          this.pointsList.length > 0
            ? (this.points = this.getPath(this.pointsList))
            : this.updatePoints()
        }),
        (n.prototype.updatePoints = function () {
          var t = nm(
            { x: this.startPoint.x, y: this.startPoint.y },
            { x: this.endPoint.x, y: this.endPoint.y },
            this.sourceNode,
            this.targetNode,
            this.offset || 0
          )
          ;(this.pointsList = t),
            (this.points = t
              .map(function (t) {
                return ''.concat(t.x, ',').concat(t.y)
              })
              .join(' '))
        }),
        (n.prototype.updateStartPoint = function (t) {
          ;(this.startPoint = Object.assign({}, t)), this.updatePoints()
        }),
        (n.prototype.moveStartPoint = function (t, e) {
          ;(this.startPoint.x += t),
            (this.startPoint.y += e),
            this.updatePoints()
        }),
        (n.prototype.updateEndPoint = function (t) {
          ;(this.endPoint = Object.assign({}, t)), this.updatePoints()
        }),
        (n.prototype.moveEndPoint = function (t, e) {
          ;(this.endPoint.x += t), (this.endPoint.y += e), this.updatePoints()
        }),
        (n.prototype.updatePointsList = function (t, e) {
          this.pointsList.forEach(function (n) {
            ;(n.x += t), (n.y += e)
          })
          var n = this.pointsList[0]
          this.startPoint = Object.assign({}, n)
          var r = this.pointsList[this.pointsList.length - 1]
          ;(this.endPoint = Object.assign({}, r)), this.initPoints()
        }),
        (n.prototype.dragAppendStart = function () {
          this.draggingPointList = this.pointsList.map(function (t) {
            return t
          })
        }),
        (n.prototype.dragAppendSimple = function (e, n) {
          var r
          this.isDragging = !0
          var o = e.start,
            i = e.end,
            a = e.startIndex,
            s = e.endIndex,
            u = e.direction,
            l = this.pointsList,
            c = l
          return (
            u === t.SegmentDirection.HORIZONTAL
              ? ((l[a] = { x: o.x, y: o.y + n.y }),
                (l[s] = { x: i.x, y: i.y + n.y }),
                (c = this.pointsList.map(function (t) {
                  return t
                })))
              : u === t.SegmentDirection.VERTICAL &&
                ((l[a] = { x: o.x + n.x, y: o.y }),
                (l[s] = { x: i.x + n.x, y: i.y }),
                (c = this.pointsList.map(function (t) {
                  return t
                }))),
            this.updatePointsAfterDrag(c),
            (this.draggingPointList = c),
            (null === (r = this.text) || void 0 === r ? void 0 : r.value) &&
              this.setText(js({}, this.text, this.textPosition)),
            {
              start: js({}, l[a]),
              end: js({}, l[s]),
              startIndex: a,
              endIndex: s,
              direction: u
            }
          )
        }),
        (n.prototype.dragAppend = function (e, n) {
          var r
          this.isDragging = !0
          var o = e.start,
            i = e.end,
            a = e.startIndex,
            s = e.endIndex,
            u = e.direction,
            l = this.pointsList
          if (u === t.SegmentDirection.HORIZONTAL) {
            ;(l[a] = { x: o.x, y: o.y + n.y }),
              (l[s] = { x: i.x, y: i.y + n.y })
            var c = this.pointsList.map(function (t) {
              return t
            })
            if (
              (0 !== a &&
                s !== this.pointsList.length - 1 &&
                (c = this.removeCrossPoints(a, s, c)),
              0 === a)
            ) {
              var d = { x: o.x, y: o.y + n.y }
              if (!Xm(d, this.sourceNode)) {
                var p = this.sourceNode.anchors
                c = this.getDraggingPoints(u, 'start', d, p, c)
              }
            }
            if (s === this.pointsList.length - 1) {
              var h = { x: i.x, y: i.y + n.y }
              if (!Xm(h, this.targetNode)) {
                p = this.targetNode.anchors
                c = this.getDraggingPoints(u, 'end', h, p, c)
              }
            }
            this.updatePointsAfterDrag(c), (this.draggingPointList = c)
          } else if (u === t.SegmentDirection.VERTICAL) {
            ;(l[a] = { x: o.x + n.x, y: o.y }),
              (l[s] = { x: i.x + n.x, y: i.y })
            c = this.pointsList.map(function (t) {
              return t
            })
            if (
              (0 !== a &&
                s !== this.pointsList.length - 1 &&
                (c = this.removeCrossPoints(a, s, c)),
              0 === a)
            ) {
              d = { x: o.x + n.x, y: o.y }
              if (!Xm(d, this.sourceNode)) {
                p = this.sourceNode.anchors
                c = this.getDraggingPoints(u, 'start', d, p, c)
              }
            }
            if (s === this.pointsList.length - 1) {
              h = { x: i.x + n.x, y: i.y }
              if (!Xm(h, this.targetNode)) {
                p = this.targetNode.anchors
                c = this.getDraggingPoints(u, 'end', h, p, c)
              }
            }
            this.updatePointsAfterDrag(c), (this.draggingPointList = c)
          }
          return (
            (null === (r = this.text) || void 0 === r ? void 0 : r.value) &&
              this.setText(js({}, this.text, this.textPosition)),
            {
              start: js({}, l[a]),
              end: js({}, l[s]),
              startIndex: a,
              endIndex: s,
              direction: u
            }
          )
        }),
        (n.prototype.dragAppendEnd = function () {
          if (this.draggingPointList) {
            var t = em(um(this.points))
            ;(this.pointsList = t.map(function (t) {
              return t
            })),
              (this.draggingPointList = [])
            var e = t[0]
            this.startPoint = js({}, e)
            var n = t[t.length - 1]
            this.endPoint = js({}, n)
          }
          this.isDragging = !1
        }),
        (n.prototype.updatePointsAfterDrag = function (t) {
          var e = this.updateCrossPoints(t)
          this.points = e
            .map(function (t) {
              return ''.concat(t.x, ',').concat(t.y)
            })
            .join(' ')
        }),
        (n.prototype.getAdjustStart = function () {
          return this.pointsList[0] || this.startPoint
        }),
        (n.prototype.getAdjustEnd = function () {
          var t = this.pointsList
          return t[t.length - 1] || this.endPoint
        }),
        (n.prototype.updateAfterAdjustStartAndEnd = function (t) {
          var e = t.startPoint,
            n = t.endPoint,
            r = t.sourceNode,
            o = t.targetNode
          ;(this.pointsList = nm(
            { x: e.x, y: e.y },
            { x: n.x, y: n.y },
            r,
            o,
            this.offset || 0
          )),
            this.initPoints()
        }),
        oo([$], n.prototype, 'dbClickPosition', void 0),
        oo([te], n.prototype, 'initPoints', null),
        oo([te], n.prototype, 'updatePoints', null),
        oo([te], n.prototype, 'updateStartPoint', null),
        oo([te], n.prototype, 'moveStartPoint', null),
        oo([te], n.prototype, 'updateEndPoint', null),
        oo([te], n.prototype, 'moveEndPoint', null),
        oo([te], n.prototype, 'updatePointsList', null),
        oo([te], n.prototype, 'dragAppendStart', null),
        oo([te], n.prototype, 'dragAppendSimple', null),
        oo([te], n.prototype, 'dragAppend', null),
        oo([te], n.prototype, 'dragAppendEnd', null),
        oo([te], n.prototype, 'updatePointsAfterDrag', null),
        oo([te], n.prototype, 'getAdjustStart', null),
        oo([te], n.prototype, 'getAdjustEnd', null),
        oo([te], n.prototype, 'updateAfterAdjustStartAndEnd', null),
        n
      )
    })(ax),
    cx = (function () {
      function e(e, n) {
        var r
        ;(this.BaseType = t.ElementType.NODE),
          (this.id = ''),
          (this.type = ''),
          (this.x = 0),
          (this.y = 0),
          (this.textMode = t.TextMode.TEXT),
          (this.text = { value: '', x: 0, y: 0, draggable: !1, editable: !0 }),
          (this._width = 100),
          (this._height = 80),
          (this.minWidth = 30),
          (this.minHeight = 30),
          (this.maxWidth = 2e3),
          (this.maxHeight = 2e3),
          (this.anchorsOffset = []),
          (this.virtual = !1),
          (this.isSelected = !1),
          (this.isHovered = !1),
          (this.isShowAnchor = !1),
          (this.isDragging = !1),
          (this.isHitable = !0),
          (this.isHittable = !0),
          (this.draggable = !0),
          (this.visible = !0),
          (this.rotatable = !0),
          (this.resizable = !0),
          (this.zIndex = 1),
          (this.state = t.ElementState.DEFAULT),
          (this.autoToFront = !0),
          (this.style = {}),
          (this._rotate = 0),
          (this.modelType = t.ModelType.NODE),
          (this.additionStateData = {}),
          (this.targetRules = []),
          (this.sourceRules = []),
          (this.moveRules = []),
          (this.resizeRules = []),
          (this.hasSetTargetRules = !1),
          (this.hasSetSourceRules = !1),
          (this.graphModel = n),
          (this.properties =
            null !== (r = e.properties) && void 0 !== r ? r : {}),
          this.initNodeData(e),
          this.setAttributes()
      }
      return (
        Object.defineProperty(e.prototype, 'width', {
          get: function () {
            return this._width
          },
          set: function (t) {
            this._width = t
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'height', {
          get: function () {
            return this._height
          },
          set: function (t) {
            this._height = t
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'rotate', {
          get: function () {
            return this._rotate
          },
          set: function (t) {
            this._rotate = t
            var e = this.x,
              n = void 0 === e ? 0 : e,
              r = this.y,
              o = void 0 === r ? 0 : r
            this.transform = new Rm(-n, -o).rotate(t).translate(n, o).toString()
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'incoming', {
          get: function () {
            return {
              nodes: this.graphModel.getNodeIncomingNode(this.id),
              edges: this.graphModel.getNodeIncomingEdge(this.id)
            }
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'outgoing', {
          get: function () {
            return {
              nodes: this.graphModel.getNodeOutgoingNode(this.id),
              edges: this.graphModel.getNodeOutgoingEdge(this.id)
            }
          },
          enumerable: !1,
          configurable: !0
        }),
        (e.prototype.initNodeData = function (e) {
          if ((e.properties || (e.properties = {}), !e.id)) {
            var n = this.graphModel.idGenerator,
              r = n && n(e.type),
              o = this.createId()
            e.id = o || r || Mb()
          }
          this.formatText(e),
            js(this, Jm(e)),
            this.graphModel.overlapMode === t.OverlapMode.INCREASE &&
              (this.zIndex = e.zIndex || rx())
        }),
        (e.prototype.setAttributes = function () {}),
        (e.prototype.createId = function () {
          return null
        }),
        (e.prototype.setTextMode = function (t) {
          this.textMode = t
        }),
        (e.prototype.formatText = function (t) {
          var e,
            n,
            r,
            o = this.graphModel.editConfigModel,
            i = o.nodeTextDraggable,
            a = o.nodeTextEdit,
            s = t.x,
            u = t.y,
            l = t.text,
            c = { value: '', x: s, y: u, draggable: i, editable: a }
          l &&
            ('string' == typeof l
              ? (c.value = l)
              : ((c = no(no({}, c), {
                  x: null !== (e = l.x) && void 0 !== e ? e : s,
                  y: null !== (n = l.y) && void 0 !== n ? n : u,
                  value: null !== (r = l.value) && void 0 !== r ? r : ''
                })),
                Cf(l.draggable) || (c.draggable = l.draggable),
                Cf(l.editable) || (c.editable = l.editable))),
            (t.text = c)
        }),
        (e.prototype.resize = function (t) {
          var e = t.width,
            n = t.height,
            r = t.deltaX,
            o = t.deltaY
          return this.isAllowResizeNode(r, o, e, n)
            ? (this.move(r / 2, o / 2),
              (this.width = e),
              (this.height = n),
              this.setProperties({ width: e, height: n }),
              this.getData())
            : this.getData()
        }),
        (e.prototype.proportionalResize = function () {}),
        (e.prototype.getData = function () {
          var e = this.text,
            n = e.x,
            r = e.y,
            o = e.value,
            i = this.properties
          Te(i) && (i = Le(i)),
            Of(i.width) && (i.width = this.width),
            Of(i.height) && (i.height = this.height)
          var a = {
            id: this.id,
            type: this.type,
            x: this.x,
            y: this.y,
            properties: i
          }
          return (
            this.rotate && (a.rotate = this.rotate),
            this.graphModel.overlapMode === t.OverlapMode.INCREASE &&
              (a.zIndex = this.zIndex),
            o && (a.text = { x: n, y: r, value: o }),
            a
          )
        }),
        (e.prototype.getHistoryData = function () {
          return this.getData()
        }),
        (e.prototype.getProperties = function () {
          return Le(this.properties)
        }),
        (e.prototype.getOuterGAttributes = function () {
          return { className: '' }
        }),
        (e.prototype.getNodeStyle = function () {
          return no(no({}, this.graphModel.theme.baseNode), this.style)
        }),
        (e.prototype.getTextStyle = function () {
          var t = this.graphModel.theme.nodeText,
            e = this.properties.textStyle,
            n = void 0 === e ? {} : e
          return no(no({}, ld(t)), ld(n))
        }),
        (e.prototype.getRotateControlStyle = function () {
          return ld(this.graphModel.theme.rotateControl)
        }),
        (e.prototype.getResizeControlStyle = function () {
          return ld(this.graphModel.theme.resizeControl)
        }),
        (e.prototype.getResizeOutlineStyle = function () {
          return ld(this.graphModel.theme.resizeOutline)
        }),
        (e.prototype.getAnchorStyle = function (t) {
          return ld(this.graphModel.theme.anchor)
        }),
        (e.prototype.getAnchorLineStyle = function (t) {
          return ld(this.graphModel.theme.anchorLine)
        }),
        (e.prototype.getOutlineStyle = function () {
          return ld(this.graphModel.theme.outline)
        }),
        (e.prototype.isAllowConnectedAsSource = function (t, e, n, r) {
          var o = this.hasSetSourceRules
            ? this.sourceRules
            : this.getConnectedSourceRules()
          this.hasSetSourceRules = !0
          for (var i = !0, a = '', s = 0; s < o.length; s++) {
            var u = o[s]
            if (!u.validate.call(this, this, t, e, n, r)) {
              ;(i = !1), (a = u.message)
              break
            }
          }
          return { isAllPass: i, msg: a }
        }),
        (e.prototype.getConnectedSourceRules = function () {
          return this.sourceRules
        }),
        (e.prototype.isAllowConnectedAsTarget = function (t, e, n, r) {
          var o = this.hasSetTargetRules
            ? this.targetRules
            : this.getConnectedTargetRules()
          this.hasSetTargetRules = !0
          for (var i = !0, a = '', s = 0; s < o.length; s++) {
            var u = o[s]
            if (!u.validate.call(this, t, this, e, n, r)) {
              ;(i = !1), (a = u.message)
              break
            }
          }
          return { isAllPass: i, msg: a }
        }),
        (e.prototype.isAllowMoveNode = function (t, e) {
          var n,
            r,
            o = !0,
            i = !0,
            a = this.moveRules.concat(this.graphModel.nodeMoveRules)
          try {
            for (var s = io(a), u = s.next(); !u.done; u = s.next()) {
              var l = (0, u.value)(this, t, e)
              if (!l) return !1
              if ('object' == typeof l) {
                var c = l
                if (!c.x && !c.y) return !1
                ;(o = o && c.x), (i = i && c.y)
              }
            }
          } catch (t) {
            n = { error: t }
          } finally {
            try {
              u && !u.done && (r = s.return) && r.call(s)
            } finally {
              if (n) throw n.error
            }
          }
          return { x: o, y: i }
        }),
        (e.prototype.getConnectedTargetRules = function () {
          return this.targetRules
        }),
        (e.prototype.getAnchorsByOffset = function () {
          var t = this,
            e = t.anchorsOffset,
            n = t.id,
            r = t.x,
            o = t.y
          return e && e.length > 0
            ? e.map(function (t, e) {
                return t.length
                  ? {
                      id: ''.concat(n, '_').concat(e),
                      x: r + t[0],
                      y: o + t[1]
                    }
                  : no(no({}, t), {
                      x: r + t.x,
                      y: o + t.y,
                      id: t.id || ''.concat(n, '_').concat(e)
                    })
              })
            : this.getDefaultAnchor()
        }),
        (e.prototype.getDefaultAnchor = function () {
          return []
        }),
        (e.prototype.getTargetAnchor = function (t) {
          return Um(t, this)
        }),
        (e.prototype.getBounds = function () {
          return {
            minX: this.x - this.width / 2,
            minY: this.y - this.height / 2,
            maxX: this.x + this.width / 2,
            maxY: this.y + this.height / 2
          }
        }),
        Object.defineProperty(e.prototype, 'anchors', {
          get: function () {
            var t = this.getAnchorsByOffset(),
              e = this,
              n = e.x,
              r = e.y,
              o = e.rotate
            return (
              t.forEach(function (t) {
                var e = t.x,
                  i = t.y,
                  a = ao(
                    new Im([e, i, 1])
                      .translate(-n, -r)
                      .rotate(o)
                      .translate(n, r)[0],
                    2
                  ),
                  s = a[0],
                  u = a[1]
                ;(t.x = s), (t.y = u)
              }),
              t
            )
          },
          enumerable: !1,
          configurable: !0
        }),
        (e.prototype.getAnchorInfo = function (t) {
          if (!Of(t))
            for (var e = 0; e < this.anchors.length; e++) {
              var n = this.anchors[e]
              if (n.id === t) return n
            }
        }),
        (e.prototype.addNodeMoveRules = function (t) {
          this.moveRules.includes(t) || this.moveRules.push(t)
        }),
        (e.prototype.isAllowMoveByXORY = function (t, e, n) {
          var r, o
          if (n) (r = !0), (o = !0)
          else {
            var i = this.isAllowMoveNode(t, e)
            'boolean' == typeof i ? ((r = i), (o = i)) : ((r = i.x), (o = i.y))
          }
          return { isAllowMoveX: r, isAllowMoveY: o }
        }),
        (e.prototype.move = function (t, e, n) {
          void 0 === n && (n = !1)
          var r = this.isAllowMoveByXORY(t, e, n),
            o = r.isAllowMoveX,
            i = r.isAllowMoveY
          return (
            o && ((this.x = this.x + t), this.text && this.moveText(t, 0)),
            i && ((this.y = this.y + e), this.text && this.moveText(0, e)),
            (o || i) && (this.rotate = this._rotate),
            o || i
          )
        }),
        (e.prototype.getMoveDistance = function (t, e, n) {
          void 0 === n && (n = !1)
          var r = this.isAllowMoveByXORY(t, e, n),
            o = r.isAllowMoveX,
            i = r.isAllowMoveY,
            a = 0,
            s = 0
          return (
            o &&
              t &&
              ((this.x = this.x + t),
              this.text && this.moveText(t, 0),
              (a = t)),
            i &&
              e &&
              ((this.y = this.y + e),
              this.text && this.moveText(0, e),
              (s = e)),
            [a, s]
          )
        }),
        (e.prototype.moveTo = function (t, e, n) {
          void 0 === n && (n = !1)
          var r = t - this.x,
            o = e - this.y
          return (
            !(!n && !this.isAllowMoveNode(r, o)) &&
            (this.text && this.moveText(r, o), (this.x = t), (this.y = e), !0)
          )
        }),
        (e.prototype.moveText = function (t, e) {
          var n = this.text,
            r = n.x,
            o = n.y,
            i = n.value,
            a = n.draggable,
            s = n.editable
          this.text = {
            value: i,
            editable: s,
            draggable: a,
            x: r + t,
            y: o + e
          }
        }),
        (e.prototype.updateText = function (t) {
          this.text = no(no({}, Le(this.text)), { value: t })
        }),
        (e.prototype.addNodeResizeRules = function (t) {
          this.resizeRules.includes(t) || this.resizeRules.push(t)
        }),
        (e.prototype.isAllowResizeNode = function (t, e, n, r) {
          var o,
            i,
            a = this.resizeRules.concat(this.graphModel.nodeResizeRules)
          try {
            for (var s = io(a), u = s.next(); !u.done; u = s.next()) {
              if (!(0, u.value)(this, t, e, n, r)) return !1
            }
          } catch (t) {
            o = { error: t }
          } finally {
            try {
              u && !u.done && (i = s.return) && i.call(s)
            } finally {
              if (o) throw o.error
            }
          }
          return !0
        }),
        (e.prototype.setSelected = function (t) {
          void 0 === t && (t = !0), (this.isSelected = t)
        }),
        (e.prototype.setHovered = function (t) {
          void 0 === t && (t = !0),
            (this.isHovered = t),
            this.setIsShowAnchor(t)
        }),
        (e.prototype.setIsShowAnchor = function (t) {
          void 0 === t && (t = !0), (this.isShowAnchor = t)
        }),
        (e.prototype.setRotatable = function (t) {
          void 0 === t && (t = !0), (this.rotatable = t)
        }),
        (e.prototype.setResizable = function (t) {
          void 0 === t && (t = !0), (this.resizable = t)
        }),
        (e.prototype.setHitable = function (t) {
          void 0 === t && (t = !0), (this.isHitable = t)
        }),
        (e.prototype.setHittable = function (t) {
          void 0 === t && (t = !0), (this.isHittable = t)
        }),
        (e.prototype.setElementState = function (t, e) {
          ;(this.state = t), (this.additionStateData = e)
        }),
        (e.prototype.updateProperties = function (e, n) {
          var r = Le(this.properties)
          ;(this.properties = e),
            this.setAttributes(),
            this.graphModel.eventCenter.emit(
              t.EventType.NODE_PROPERTIES_CHANGE,
              { id: this.id, keys: n, preProperties: r, properties: e }
            )
        }),
        (e.prototype.setProperty = function (t, e) {
          var n = ld(Le(this.properties))
          Sy(n, t, h_(e)), this.updateProperties(n, [t])
        }),
        (e.prototype.setProperties = function (t) {
          var e = Le(this.properties),
            n = no(no({}, e), h_(t)),
            r = []
          Gf(t, function (t, n) {
            ;((zh(e, n) && e[n] !== t) || !zh(e, n)) && r.push(n)
          }),
            this.updateProperties(n, r)
        }),
        (e.prototype.deleteProperty = function (t) {
          delete this.properties[t], this.setAttributes()
        }),
        (e.prototype.setStyle = function (t, e) {
          var n
          this.style = no(no({}, this.style), (((n = {})[t] = h_(e)), n))
        }),
        (e.prototype.setStyles = function (t) {
          this.style = no(no({}, this.style), h_(t))
        }),
        (e.prototype.updateStyles = function (t) {
          this.style = no({}, h_(t))
        }),
        (e.prototype.setZIndex = function (t) {
          void 0 === t && (t = 1), (this.zIndex = t)
        }),
        (e.prototype.updateAttributes = function (t) {
          js(this, t)
        }),
        (e.BaseType = t.ElementType.NODE),
        oo([$], e.prototype, 'type', void 0),
        oo([$], e.prototype, 'x', void 0),
        oo([$], e.prototype, 'y', void 0),
        oo([$], e.prototype, 'textMode', void 0),
        oo([$], e.prototype, 'text', void 0),
        oo([$], e.prototype, 'properties', void 0),
        oo([$], e.prototype, '_width', void 0),
        oo([$], e.prototype, '_height', void 0),
        oo([$], e.prototype, 'anchorsOffset', void 0),
        oo([$], e.prototype, 'isSelected', void 0),
        oo([$], e.prototype, 'isHovered', void 0),
        oo([$], e.prototype, 'isShowAnchor', void 0),
        oo([$], e.prototype, 'isDragging', void 0),
        oo([$], e.prototype, 'isHitable', void 0),
        oo([$], e.prototype, 'isHittable', void 0),
        oo([$], e.prototype, 'draggable', void 0),
        oo([$], e.prototype, 'visible', void 0),
        oo([$], e.prototype, 'rotatable', void 0),
        oo([$], e.prototype, 'resizable', void 0),
        oo([$], e.prototype, 'zIndex', void 0),
        oo([$], e.prototype, 'state', void 0),
        oo([$], e.prototype, 'autoToFront', void 0),
        oo([$], e.prototype, 'style', void 0),
        oo([$], e.prototype, 'transform', void 0),
        oo([$], e.prototype, '_rotate', void 0),
        oo([rt], e.prototype, 'incoming', null),
        oo([rt], e.prototype, 'outgoing', null),
        oo([te], e.prototype, 'setTextMode', null),
        oo([te], e.prototype, 'addNodeMoveRules', null),
        oo([te], e.prototype, 'move', null),
        oo([te], e.prototype, 'getMoveDistance', null),
        oo([te], e.prototype, 'moveTo', null),
        oo([te], e.prototype, 'moveText', null),
        oo([te], e.prototype, 'updateText', null),
        oo([te], e.prototype, 'addNodeResizeRules', null),
        oo([te], e.prototype, 'setSelected', null),
        oo([te], e.prototype, 'setHovered', null),
        oo([te], e.prototype, 'setIsShowAnchor', null),
        oo([te], e.prototype, 'setRotatable', null),
        oo([te], e.prototype, 'setResizable', null),
        oo([te], e.prototype, 'setHitable', null),
        oo([te], e.prototype, 'setHittable', null),
        oo([te], e.prototype, 'setElementState', null),
        oo([te], e.prototype, 'setProperty', null),
        oo([te], e.prototype, 'setProperties', null),
        oo([te], e.prototype, 'deleteProperty', null),
        oo([te], e.prototype, 'setStyle', null),
        oo([te], e.prototype, 'setStyles', null),
        oo([te], e.prototype, 'updateStyles', null),
        oo([te], e.prototype, 'setZIndex', null),
        oo([te], e.prototype, 'updateAttributes', null),
        e
      )
    })(),
    dx = (function (e) {
      function n(n, r) {
        var o = e.call(this, n, r) || this
        return (
          (o.modelType = t.ModelType.CIRCLE_NODE),
          (o.r = 50),
          o.initNodeData(n),
          o.setAttributes(),
          o
        )
      }
      return (
        eo(n, e),
        Object.defineProperty(n.prototype, 'width', {
          get: function () {
            return 2 * this.r
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(n.prototype, 'height', {
          get: function () {
            return 2 * this.r
          },
          enumerable: !1,
          configurable: !0
        }),
        (n.prototype.setAttributes = function () {
          e.prototype.setAttributes.call(this)
          var t = this.properties.r
          t && (this.r = t)
        }),
        (n.prototype.getNodeStyle = function () {
          var t = e.prototype.getNodeStyle.call(this),
            n = this.graphModel.theme.circle,
            r = this.properties.style,
            o = void 0 === r ? {} : r
          return no(no(no({}, t), ld(n)), ld(o))
        }),
        (n.prototype.getDefaultAnchor = function () {
          var t = this,
            e = t.x,
            n = t.y,
            r = t.r
          return [
            { x: e, y: n - r, id: ''.concat(this.id, '_0') },
            { x: e + r, y: n, id: ''.concat(this.id, '_1') },
            { x: e, y: n + r, id: ''.concat(this.id, '_2') },
            { x: e - r, y: n, id: ''.concat(this.id, '_3') }
          ]
        }),
        (n.prototype.resize = function (t) {
          var e = t.width,
            n = t.deltaX,
            r = t.deltaY
          return (
            this.move(n / 2, r / 2),
            (this.r = e),
            this.setProperties({ r: e }),
            this.getData()
          )
        }),
        oo([$], n.prototype, 'r', void 0),
        oo([rt], n.prototype, 'width', null),
        oo([rt], n.prototype, 'height', null),
        n
      )
    })(cx),
    px = (function (e) {
      function n(n, r) {
        var o = e.call(this, n, r) || this
        return (
          (o.modelType = t.ModelType.DIAMOND_NODE),
          (o.rx = 30),
          (o.ry = 50),
          o.initNodeData(n),
          o.setAttributes(),
          o
        )
      }
      return (
        eo(n, e),
        (n.prototype.setAttributes = function () {
          e.prototype.setAttributes.call(this)
          var t = this.properties,
            n = t.rx,
            r = t.ry
          n && (this.rx = n), r && (this.ry = r)
        }),
        (n.prototype.getNodeStyle = function () {
          var t = e.prototype.getNodeStyle.call(this),
            n = this.graphModel.theme.diamond,
            r = this.properties.style,
            o = void 0 === r ? {} : r
          return no(no(no({}, t), ld(n)), ld(o))
        }),
        Object.defineProperty(n.prototype, 'points', {
          get: function () {
            var t = this,
              e = t.x,
              n = t.y,
              r = t.rx,
              o = t.ry
            return [
              [e, n - o],
              [e + r, n],
              [e, n + o],
              [e - r, n]
            ]
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(n.prototype, 'pointsPosition', {
          get: function () {
            return Mh(this.points, function (t) {
              var e = ao(t, 2)
              return { x: e[0], y: e[1] }
            })
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(n.prototype, 'width', {
          get: function () {
            var t = Number.MAX_SAFE_INTEGER,
              e = Number.MIN_SAFE_INTEGER
            return (
              Fp(this.points, function (n) {
                var r = ao(n, 1)[0]
                r < t && (t = r), r > e && (e = r)
              }),
              e - t
            )
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(n.prototype, 'height', {
          get: function () {
            var t = Number.MAX_SAFE_INTEGER,
              e = Number.MIN_SAFE_INTEGER
            return (
              Fp(this.points, function (n) {
                var r = ao(n, 2)[1]
                r < t && (t = r), r > e && (e = r)
              }),
              e - t
            )
          },
          enumerable: !1,
          configurable: !0
        }),
        (n.prototype.getDefaultAnchor = function () {
          var t = this
          return Mh(this.points, function (e, n) {
            var r = ao(e, 2)
            return { x: r[0], y: r[1], id: ''.concat(t.id, '_').concat(n) }
          })
        }),
        (n.prototype.resize = function (t) {
          var e = t.width,
            n = t.height,
            r = t.deltaX,
            o = t.deltaY
          return (
            this.move(r / 2, o / 2),
            (this.rx = e),
            (this.ry = n),
            this.setProperties({ rx: e, ry: n }),
            this.getData()
          )
        }),
        oo([$], n.prototype, 'rx', void 0),
        oo([$], n.prototype, 'ry', void 0),
        oo([rt], n.prototype, 'points', null),
        oo([rt], n.prototype, 'pointsPosition', null),
        oo([rt], n.prototype, 'width', null),
        oo([rt], n.prototype, 'height', null),
        n
      )
    })(cx),
    hx = (function (e) {
      function n(n, r) {
        var o = e.call(this, n, r) || this
        return (
          (o.modelType = t.ModelType.ELLIPSE_NODE),
          (o.rx = 30),
          (o.ry = 45),
          o.initNodeData(n),
          o.setAttributes(),
          o
        )
      }
      return (
        eo(n, e),
        (n.prototype.setAttributes = function () {
          e.prototype.setAttributes.call(this)
          var t = this.properties,
            n = t.rx,
            r = t.ry
          n && (this.rx = n), r && (this.ry = r)
        }),
        (n.prototype.getNodeStyle = function () {
          var t = e.prototype.getNodeStyle.call(this),
            n = this.graphModel.theme.ellipse,
            r = this.properties.style,
            o = void 0 === r ? {} : r
          return no(no(no({}, t), ld(n)), ld(o))
        }),
        Object.defineProperty(n.prototype, 'width', {
          get: function () {
            return 2 * this.rx
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(n.prototype, 'height', {
          get: function () {
            return 2 * this.ry
          },
          enumerable: !1,
          configurable: !0
        }),
        (n.prototype.getDefaultAnchor = function () {
          var t = this,
            e = t.x,
            n = t.y,
            r = t.rx,
            o = t.ry
          return [
            { x: e, y: n - o, id: ''.concat(this.id, '_0') },
            { x: e + r, y: n, id: ''.concat(this.id, '_1') },
            { x: e, y: n + o, id: ''.concat(this.id, '_2') },
            { x: e - r, y: n, id: ''.concat(this.id, '_3') }
          ]
        }),
        (n.prototype.resize = function (t) {
          var e = t.width,
            n = t.height,
            r = t.deltaX,
            o = t.deltaY
          return (
            this.move(r / 2, o / 2),
            (this.rx = e),
            (this.ry = n),
            this.setProperties({ rx: e, ry: n }),
            this.getData()
          )
        }),
        oo([$], n.prototype, 'rx', void 0),
        oo([$], n.prototype, 'ry', void 0),
        oo([rt], n.prototype, 'width', null),
        oo([rt], n.prototype, 'height', null),
        n
      )
    })(cx),
    fx = (function (e) {
      function n(n, r) {
        var o = e.call(this, n, r) || this
        return (
          (o.modelType = t.ModelType.POLYGON_NODE),
          (o.points = [
            [50, 0],
            [100, 50],
            [50, 100],
            [0, 50]
          ]),
          o.initNodeData(n),
          o.setAttributes(),
          o
        )
      }
      return (
        eo(n, e),
        (n.prototype.setAttributes = function () {
          e.prototype.setAttributes.call(this)
          var t = this.properties,
            n = t.points,
            r = t.width,
            o = t.height,
            i = n || this.points
          this.points = wm(i, r, o)
        }),
        (n.prototype.getNodeStyle = function () {
          var t = e.prototype.getNodeStyle.call(this),
            n = this.graphModel.theme.polygon,
            r = this.properties.style,
            o = void 0 === r ? {} : r
          return no(no(no({}, t), ld(n)), ld(o))
        }),
        Object.defineProperty(n.prototype, 'pointsPosition', {
          get: function () {
            var t = this,
              e = t.x,
              n = t.y,
              r = t.width,
              o = t.height
            return this.points.map(function (t) {
              return { x: t[0] + e - r / 2, y: t[1] + n - o / 2 }
            })
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(n.prototype, 'width', {
          get: function () {
            var t = Number.MAX_SAFE_INTEGER,
              e = Number.MIN_SAFE_INTEGER
            return (
              this.points.forEach(function (n) {
                var r = ao(n, 1)[0]
                r < t && (t = r), r > e && (e = r)
              }),
              e - t
            )
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(n.prototype, 'height', {
          get: function () {
            var t = Number.MAX_SAFE_INTEGER,
              e = Number.MIN_SAFE_INTEGER
            return (
              this.points.forEach(function (n) {
                var r = ao(n, 2)[1]
                r < t && (t = r), r > e && (e = r)
              }),
              e - t
            )
          },
          enumerable: !1,
          configurable: !0
        }),
        (n.prototype.getDefaultAnchor = function () {
          var t = this,
            e = this,
            n = e.x,
            r = e.y,
            o = e.width,
            i = e.height
          return e.points.map(function (e, a) {
            var s = ao(e, 2),
              u = s[0],
              l = s[1]
            return {
              x: n + u - o / 2,
              y: r + l - i / 2,
              id: ''.concat(t.id, '_').concat(a)
            }
          })
        }),
        (n.prototype.resize = function (t) {
          var e = this,
            n = t.width,
            r = t.height,
            o = t.deltaX,
            i = t.deltaY
          this.move(o / 2, i / 2)
          var a = Mh(this.points, function (t) {
            var o = ao(t, 2),
              i = o[0],
              a = o[1]
            return [(i * n) / e.width, (a * r) / e.height]
          })
          return (this.points = a), (this.properties.points = a), this.getData()
        }),
        oo([$], n.prototype, 'points', void 0),
        oo([rt], n.prototype, 'pointsPosition', null),
        oo([rt], n.prototype, 'width', null),
        oo([rt], n.prototype, 'height', null),
        n
      )
    })(cx),
    vx = (function (e) {
      function n(n, r) {
        var o = e.call(this, n, r) || this
        return (
          (o.modelType = t.ModelType.RECT_NODE),
          (o.radius = 0),
          o.initNodeData(n),
          o.setAttributes(),
          o
        )
      }
      return (
        eo(n, e),
        (n.prototype.setAttributes = function () {
          e.prototype.setAttributes.call(this)
          var t = this.properties,
            n = t.width,
            r = t.height,
            o = t.radius
          Of(n) || (this.width = n),
            Of(r) || (this.height = r),
            Of(o) || (this.radius = o)
        }),
        (n.prototype.getDefaultAnchor = function () {
          var t = this,
            e = t.x,
            n = t.y,
            r = t.width,
            o = t.height
          return [
            { x: e, y: n - o / 2, id: ''.concat(this.id, '_0') },
            { x: e + r / 2, y: n, id: ''.concat(this.id, '_1') },
            { x: e, y: n + o / 2, id: ''.concat(this.id, '_2') },
            { x: e - r / 2, y: n, id: ''.concat(this.id, '_3') }
          ]
        }),
        (n.prototype.getNodeStyle = function () {
          var t = e.prototype.getNodeStyle.call(this),
            n = this.graphModel.theme.rect,
            r = this.properties.style,
            o = void 0 === r ? {} : r
          return no(no(no({}, t), ld(n)), ld(o))
        }),
        oo([$], n.prototype, 'radius', void 0),
        n
      )
    })(cx),
    yx = (function (e) {
      function n() {
        var n = e.apply(this, so([], ao(arguments), !1)) || this
        return (n.modelType = t.ModelType.TEXT_NODE), n
      }
      return (
        eo(n, e),
        (n.prototype.getTextStyle = function () {
          var t = e.prototype.getTextStyle.call(this),
            n = this.graphModel.theme.text,
            r = this.properties.textStyle
          return no(no(no({}, t), ld(n)), ld(r))
        }),
        Object.defineProperty(n.prototype, 'width', {
          get: function () {
            var t = String(this.text.value).split(/[\r\n]/g),
              e = this.getTextStyle().fontSize
            return eb({ rows: t, fontSize: e, rowsLength: t.length }).width
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(n.prototype, 'height', {
          get: function () {
            var t = String(this.text.value).split(/[\r\n]/g),
              e = this.getTextStyle().fontSize
            return eb({ rows: t, fontSize: e, rowsLength: t.length }).height
          },
          enumerable: !1,
          configurable: !0
        }),
        oo([rt], n.prototype, 'width', null),
        oo([rt], n.prototype, 'height', null),
        n
      )
    })(cx),
    gx = (function (e) {
      function n(n, r) {
        var o = e.call(this, n, r) || this
        return (o.modelType = t.ModelType.HTML_NODE), o.setAttributes(), o
      }
      return (
        eo(n, e),
        (n.prototype.setAttributes = function () {
          e.prototype.setAttributes.call(this)
          var t = this.properties,
            n = t.width,
            r = t.height
          n && (this.width = n), r && (this.height = r)
        }),
        (n.prototype.getDefaultAnchor = function () {
          var t = this,
            e = t.x,
            n = t.y,
            r = t.width,
            o = t.height
          return [
            { x: e, y: n - o / 2, id: ''.concat(this.id, '_0') },
            { x: e + r / 2, y: n, id: ''.concat(this.id, '_1') },
            { x: e, y: n + o / 2, id: ''.concat(this.id, '_2') },
            { x: e - r / 2, y: n, id: ''.concat(this.id, '_3') }
          ]
        }),
        n
      )
    })(cx),
    _x = {
      stopZoomGraph: !1,
      stopScrollGraph: !1,
      stopMoveGraph: !1,
      adjustEdge: !1,
      adjustEdgeStartAndEnd: !1,
      adjustNodePosition: !1,
      hideAnchors: !0,
      allowRotate: !1,
      allowResize: !1,
      nodeSelectedOutline: !0,
      textEdit: !1,
      nodeTextEdit: !1,
      edgeTextEdit: !1,
      textDraggable: !1,
      nodeTextDraggable: !1,
      edgeTextDraggable: !1
    },
    mx = [
      'isSilentMode',
      'stopZoomGraph',
      'stopScrollGraph',
      'stopMoveGraph',
      'snapGrid',
      'adjustEdge',
      'adjustEdgeMiddle',
      'adjustEdgeStartAndEnd',
      'adjustEdgeStart',
      'adjustEdgeEnd',
      'adjustNodePosition',
      'hideAnchors',
      'allowRotate',
      'allowResize',
      'autoExpand',
      'hoverOutline',
      'nodeSelectedOutline',
      'edgeSelectedOutline',
      'textEdit',
      'nodeTextEdit',
      'edgeTextEdit',
      'textDraggable',
      'nodeTextDraggable',
      'edgeTextDraggable',
      'multipleSelectKey',
      'textMode',
      'nodeTextMode',
      'edgeTextMode',
      'nodeTextMultiple',
      'edgeTextMultiple',
      'nodeTextVertical',
      'edgeTextVertical'
    ],
    bx = (function () {
      function e(e) {
        ;(this.isSilentMode = !1),
          (this.stopZoomGraph = !1),
          (this.stopMoveGraph = !1),
          (this.stopScrollGraph = !1),
          (this.snapGrid = !1),
          (this.textMode = t.TextMode.TEXT),
          (this.textEdit = !0),
          (this.textDraggable = !1),
          (this.nodeTextEdit = !0),
          (this.nodeTextDraggable = !1),
          (this.nodeTextMultiple = !1),
          (this.nodeTextVertical = !1),
          (this.nodeTextMode = t.TextMode.TEXT),
          (this.edgeTextMode = t.TextMode.TEXT),
          (this.edgeTextEdit = !0),
          (this.edgeTextDraggable = !1),
          (this.edgeTextMultiple = !1),
          (this.edgeTextVertical = !1),
          (this.hideAnchors = !1),
          (this.allowRotate = !1),
          (this.allowResize = !1),
          (this.hoverOutline = !0),
          (this.nodeSelectedOutline = !0),
          (this.adjustNodePosition = !0),
          (this.autoExpand = !1),
          (this.adjustEdge = !0),
          (this.adjustEdgeMiddle = !1),
          (this.adjustEdgeStartAndEnd = !1),
          (this.adjustEdgeStart = !1),
          (this.adjustEdgeEnd = !1),
          (this.edgeSelectedOutline = !0),
          (this.multipleSelectKey = ''),
          js(this, this.computeConfig(e))
      }
      return (
        (e.prototype.updateEditConfig = function (t) {
          var e = this.computeConfig(t)
          js(this, e)
        }),
        (e.prototype.computeConfig = function (t) {
          var e = t.isSilentMode,
            n = t.textDraggable,
            r = t.textMode,
            o = t.textEdit,
            i = t.adjustEdgeStartAndEnd,
            a = {}
          if (
            (!1 === e && js(a, this.stagedConfig),
            !0 === e && e !== this.isSilentMode)
          ) {
            var s = Vv(_x, mx)
            ;(this.stagedConfig = Vv(this, mx)), js(a, s)
          }
          Cf(o) || js(a, { nodeTextEdit: o, edgeTextEdit: o }),
            Cf(n) || js(a, { nodeTextDraggable: n, edgeTextDraggable: n }),
            r && js(a, { nodeTextMode: r, edgeTextMode: r }),
            vf(i) && js(a, { adjustEdgeStart: i, adjustEdgeEnd: i })
          var u = Vv(t, mx)
          return js(a, u)
        }),
        (e.prototype.updateTextMode = function (t) {
          ;(this.textMode = t), (this.edgeTextMode = t), (this.nodeTextMode = t)
        }),
        (e.prototype.getConfig = function () {
          return Vv(this, mx)
        }),
        oo([$], e.prototype, 'isSilentMode', void 0),
        oo([$], e.prototype, 'stopZoomGraph', void 0),
        oo([$], e.prototype, 'stopMoveGraph', void 0),
        oo([$], e.prototype, 'stopScrollGraph', void 0),
        oo([$], e.prototype, 'snapGrid', void 0),
        oo([$], e.prototype, 'textMode', void 0),
        oo([$], e.prototype, 'textEdit', void 0),
        oo([$], e.prototype, 'textDraggable', void 0),
        oo([$], e.prototype, 'nodeTextEdit', void 0),
        oo([$], e.prototype, 'nodeTextDraggable', void 0),
        oo([$], e.prototype, 'nodeTextMultiple', void 0),
        oo([$], e.prototype, 'nodeTextVertical', void 0),
        oo([$], e.prototype, 'nodeTextMode', void 0),
        oo([$], e.prototype, 'edgeTextMode', void 0),
        oo([$], e.prototype, 'edgeTextEdit', void 0),
        oo([$], e.prototype, 'edgeTextDraggable', void 0),
        oo([$], e.prototype, 'edgeTextMultiple', void 0),
        oo([$], e.prototype, 'edgeTextVertical', void 0),
        oo([$], e.prototype, 'hideAnchors', void 0),
        oo([$], e.prototype, 'allowRotate', void 0),
        oo([$], e.prototype, 'allowResize', void 0),
        oo([$], e.prototype, 'hoverOutline', void 0),
        oo([$], e.prototype, 'nodeSelectedOutline', void 0),
        oo([$], e.prototype, 'adjustNodePosition', void 0),
        oo([$], e.prototype, 'autoExpand', void 0),
        oo([$], e.prototype, 'adjustEdge', void 0),
        oo([$], e.prototype, 'adjustEdgeMiddle', void 0),
        oo([$], e.prototype, 'adjustEdgeStartAndEnd', void 0),
        oo([$], e.prototype, 'adjustEdgeStart', void 0),
        oo([$], e.prototype, 'adjustEdgeEnd', void 0),
        oo([$], e.prototype, 'edgeSelectedOutline', void 0),
        oo([te], e.prototype, 'updateEditConfig', null),
        oo([te], e.prototype, 'updateTextMode', null),
        e
      )
    })(),
    xx = (function () {
      function t() {
        this._events = {}
      }
      return (
        (t.prototype.on = function (t, e, n) {
          var r = this
          null == t ||
            t.split(',').forEach(function (t) {
              ;(t = t.trim()),
                r._events[t] || (r._events[t] = []),
                r._events[t].push({ callback: e, once: !!n })
            })
        }),
        (t.prototype.once = function (t, e) {
          var n = this
          null == t ||
            t.split(',').forEach(function (t) {
              ;(t = t.trim()), n.on(t, e, !0)
            })
        }),
        (t.prototype.emit = function (t, e) {
          var n = this
          null == t ||
            t.split(',').forEach(function (t) {
              var r = n._events[t] || [],
                o = n._events['*'] || [],
                i = function (r) {
                  for (var o = r.length, i = 0; i < o; i++)
                    if (r[i]) {
                      var a = r[i],
                        s = a.callback
                      a.once &&
                        (r.splice(i, 1),
                        0 === r.length && delete n._events[t],
                        o--,
                        i--),
                        s.apply(n, [e])
                    }
                }
              i(r), i(o)
            })
        }),
        (t.prototype.off = function (t, e) {
          var n = this
          t || (this._events = {}),
            t.split(',').forEach(function (t) {
              if (e) {
                for (
                  var r = n._events[t] || [], o = r.length, i = 0;
                  i < o;
                  i++
                )
                  r[i].callback === e && (r.splice(i, 1), o--, i--)
                0 === r.length && delete n._events[t]
              } else delete n._events[t]
            })
        }),
        (t.prototype.getEvents = function () {
          return this._events
        }),
        (t.prototype.destroy = function () {
          this._events = {}
        }),
        t
      )
    })(),
    Ex = (function (e) {
      function n(n) {
        var r = e.call(this) || this
        ;(r.stepScrollX = 0),
          (r.stepScrollY = 0),
          (r.onDragging = function (t) {
            var e = t.deltaX,
              n = t.deltaY
            r.setState({ isDragging: !0 })
            var o = r.props.graphModel,
              i = o.transformModel
            !0 !== o.editConfigModel.stopMoveGraph && i.translate(e, n)
          }),
          (r.onDragEnd = function () {
            r.setState({ isDragging: !1 })
          }),
          (r.zoomHandler = function (t) {
            var e = r.props,
              n = e.graphModel,
              o = n.editConfigModel,
              i = n.transformModel,
              a = n.gridSize,
              s = e.graphModel,
              u = t.deltaX,
              l = t.deltaY,
              c = o.stopScrollGraph,
              d = o.stopZoomGraph
            if (c || t.ctrlKey || t.metaKey) {
              if (!d) {
                t.preventDefault()
                var p = s.getPointByClient({
                    x: t.clientX,
                    y: t.clientY
                  }).canvasOverlayPosition,
                  h = p.x,
                  f = p.y
                i.zoom(t.deltaY < 0, [h, f])
              }
            } else {
              if (
                (t.preventDefault(),
                (r.stepScrollX += u),
                (r.stepScrollY += l),
                Math.abs(r.stepScrollX) >= a)
              ) {
                var v = r.stepScrollX % a,
                  y = r.stepScrollX - v
                i.translate(-y * i.SCALE_X, 0), (r.stepScrollX = v)
              }
              if (Math.abs(r.stepScrollY) >= a) {
                var g = r.stepScrollY % a,
                  _ = r.stepScrollY - g
                i.translate(0, -_ * i.SCALE_Y), (r.stepScrollY = g)
              }
            }
          }),
          (r.clickHandler = function (e) {
            if ('canvas-overlay' === e.target.getAttribute('name')) {
              var n = r.props.graphModel
              n.selectElements.size > 0 && n.clearSelectElements(),
                n.eventCenter.emit(t.EventType.BLANK_CLICK, { e: e })
            }
          }),
          (r.handleContextMenu = function (e) {
            if ('canvas-overlay' === e.target.getAttribute('name')) {
              e.preventDefault()
              var n = r.props.graphModel,
                o = n.getPointByClient({ x: e.clientX, y: e.clientY })
              n.eventCenter.emit(t.EventType.BLANK_CONTEXTMENU, {
                e: e,
                position: o
              })
            }
          }),
          (r.mouseDownHandler = function (e) {
            var n = r.props.graphModel,
              o = n.eventCenter,
              i = n.editConfigModel,
              a = n.transformModel.SCALE_X,
              s = n.gridSize,
              u = i.adjustEdge,
              l = i.adjustNodePosition,
              c = i.stopMoveGraph,
              d = !u && !l
            ;('canvas-overlay' === e.target.getAttribute('name') || d) &&
              (!0 !== c
                ? (r.stepDrag.setStep(s * a), r.stepDrag.handleMouseDown(e))
                : o.emit(t.EventType.BLANK_MOUSEDOWN, { e: e }),
              r.clickHandler(e))
          })
        var o = n.graphModel,
          i = o.gridSize,
          a = o.eventCenter
        return (
          (r.stepDrag = new E_({
            onDragging: r.onDragging,
            onDragEnd: r.onDragEnd,
            step: i,
            eventType: 'BLANK',
            isStopPropagation: !1,
            eventCenter: a,
            model: void 0
          })),
          (r.state = { isDragging: !1 }),
          r
        )
      }
      return (
        eo(n, e),
        (n.prototype.render = function () {
          var t =
              this.props.graphModel.transformModel.getTransformStyle()
                .transform,
            e = this.props,
            n = e.children,
            r = e.dnd,
            o = this.state.isDragging
          return lo(
            'svg',
            no(
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '100%',
                height: '100%',
                name: 'canvas-overlay',
                onWheel: this.zoomHandler,
                onMouseDown: this.mouseDownHandler,
                onContextMenu: this.handleContextMenu,
                className: o
                  ? 'lf-canvas-overlay lf-dragging'
                  : 'lf-canvas-overlay lf-drag-able'
              },
              r.eventMap(),
              { children: lo('g', { transform: t, children: n }) }
            )
          )
        }),
        (n = oo([zE], n))
      )
    })(Fn),
    Mx = (function (e) {
      function n() {
        var n = e.call(this) || this
        return (
          (n.onDragging = function (e) {
            var r = e.event,
              o = n.props,
              i = o.graphModel,
              a = o.bezierModel,
              s = o.type,
              u = i.getPointByClient({
                x: r.clientX,
                y: r.clientY
              }).canvasOverlayPosition,
              l = u.x,
              c = u.y
            a.updateAdjustAnchor({ x: l, y: c }, s),
              i.eventCenter.emit(t.EventType.EDGE_ADJUST, { data: a.getData() })
          }),
          (n.onDragEnd = function () {
            n.props.bezierModel.isDragging = !1
          }),
          (n.dragHandler = new E_({
            onDragging: n.onDragging,
            onDragEnd: n.onDragEnd
          })),
          n
        )
      }
      return (
        eo(n, e),
        (n.prototype.render = function () {
          var t = this,
            e = this.props.position,
            n = e.x,
            r = e.y,
            o = this.props.bezierModel.getEdgeStyle().adjustAnchor
          return lo(
            Ib,
            no({ className: 'lf-bezier-adjust-anchor', x: n, y: r }, o, {
              onMouseDown: function (e) {
                t.dragHandler.handleMouseDown(e)
              }
            })
          )
        }),
        n
      )
    })(Fn),
    Tx = (function (e) {
      function n() {
        return (null !== e && e.apply(this, arguments)) || this
      }
      return (
        eo(n, e),
        (n.prototype.getBezierAdjust = function (t, e) {
          var n = t.path,
            r = t.id,
            o = ao(ym(n), 4),
            i = o[0],
            a = o[1],
            s = o[2],
            u = o[3],
            l = t.getEdgeStyle().adjustLine,
            c = []
          return (
            c.push(lo(Nb, no({ x1: i.x, y1: i.y, x2: a.x, y2: a.y }, l))),
            c.push(
              lo(
                Mx,
                { position: a, bezierModel: t, graphModel: e, type: 'sNext' },
                ''.concat(r, '_ePre')
              )
            ),
            c.push(lo(Nb, no({ x1: u.x, y1: u.y, x2: s.x, y2: s.y }, l))),
            c.push(
              lo(
                Mx,
                { position: s, bezierModel: t, graphModel: e, type: 'ePre' },
                ''.concat(r, '_sNext')
              )
            ),
            c
          )
        }),
        (n.prototype.selectedBezierEdge = function () {
          for (
            var e = this.props.graphModel, n = e.edges, r = [], o = 0;
            o < n.length;
            o++
          ) {
            var i = n[o]
            i.isSelected &&
              i.modelType === t.ModelType.BEZIER_EDGE &&
              i.draggable &&
              r.push(this.getBezierAdjust(i, e))
          }
          return r
        }),
        (n.prototype.render = function () {
          return lo('g', {
            className: 'lf-bezier-adjust',
            children: this.selectedBezierEdge()
          })
        }),
        (n = oo([zE], n))
      )
    })(Fn),
    Sx = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this
      }
      return (
        eo(e, t),
        (e.prototype.render = function () {
          var t = this.props.background
          return lo('div', {
            className: 'lf-background',
            children: lo('div', {
              style: Ho(t) ? t : {},
              className: 'lf-background-area'
            })
          })
        }),
        (e = oo([zE], e))
      )
    })(Fn),
    wx = (function (t) {
      function e(e) {
        var n = t.call(this, e) || this
        return (n.id = Mb()), (n.gridOptions = n.props.graphModel.grid), n
      }
      return (
        eo(e, t),
        (e.prototype.renderDot = function () {
          var t = this.gridOptions,
            e = t.config,
            n = t.size,
            r = void 0 === n ? 1 : n,
            o = t.visible,
            i = null != e ? e : {},
            a = i.color,
            s = i.thickness,
            u = void 0 === s ? 2 : s,
            l = Math.min(Math.max(2, u), r / 4)
          return lo('g', {
            fill: a,
            opacity: o ? 1 : 0,
            children: [
              lo('circle', { cx: 0, cy: 0, r: l / 2 }),
              lo('circle', { cx: 0, cy: r, r: l / 2 }),
              lo('circle', { cx: r, cy: 0, r: l / 2 }),
              lo('circle', { cx: r, cy: r, r: l / 2 })
            ]
          })
        }),
        (e.prototype.renderMesh = function () {
          var t = this.gridOptions,
            e = t.config,
            n = t.size,
            r = void 0 === n ? 1 : n,
            o = t.visible,
            i = null != e ? e : {},
            a = i.color,
            s = i.thickness,
            u = void 0 === s ? 1 : s,
            l = Math.min(Math.max(1, u), r / 2)
          return lo('path', {
            d: 'M 0 0 H '.concat(r, ' V ').concat(r, ' H 0 Z'),
            stroke: a,
            strokeWidth: l / 2,
            opacity: o ? 1 : 0,
            fill: 'transparent'
          })
        }),
        (e.prototype.render = function () {
          var t = this.props.graphModel.transformModel,
            e = this.gridOptions,
            n = e.type,
            r = e.size,
            o = void 0 === r ? 1 : r,
            i = [
              t.SCALE_X,
              t.SKEW_Y,
              t.SKEW_X,
              t.SCALE_Y,
              t.TRANSLATE_X,
              t.TRANSLATE_Y
            ].join(','),
            a = 'matrix('.concat(i, ')')
          return lo('div', {
            className: 'lf-grid',
            children: lo('svg', {
              xmlns: 'http://www.w3.org/2000/svg',
              version: '1.1',
              width: '100%',
              height: '100%',
              children: [
                lo('defs', {
                  children: lo('pattern', {
                    id: this.id,
                    patternUnits: 'userSpaceOnUse',
                    patternTransform: a,
                    x: '0',
                    y: '0',
                    width: o,
                    height: o,
                    children: [
                      'dot' === n && this.renderDot(),
                      'mesh' === n && this.renderMesh()
                    ]
                  })
                }),
                lo('rect', {
                  width: '100%',
                  height: '100%',
                  fill: 'url(#'.concat(this.id, ')')
                })
              ]
            })
          })
        }),
        (e = oo([zE], e))
      )
    })(Fn)
  !(function (t) {
    ;(t.defaultProps = {
      size: 10,
      visible: !0,
      type: 'dot',
      config: { color: '#ababab', thickness: 1 }
    }),
      (t.getGridOptions = function (e) {
        var n = ld(t.defaultProps)
        return js(
          n,
          'number' == typeof e
            ? { size: e }
            : 'boolean' == typeof e
            ? { visible: e }
            : e
        )
      })
  })(wx || (wx = {}))
  var Ax = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this
      }
      return (
        eo(e, t),
        (e.prototype.render = function () {
          return lo('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            version: '1.1',
            width: '100%',
            height: '100%',
            className: 'modification-overlay',
            children: lo('g', {
              transform:
                this.props.graphModel.transformModel.getTransformStyle()
                  .transform,
              children: this.props.children
            })
          })
        }),
        (e = oo([zE], e))
      )
    })(Fn),
    Ox = (function (e) {
      function n() {
        return (null !== e && e.apply(this, arguments)) || this
      }
      return (
        eo(n, e),
        (n.prototype.getNodesOutline = function () {
          var t = this.props.graphModel,
            e = t.nodes,
            n = t.editConfigModel,
            r = n.hoverOutline,
            o = n.nodeSelectedOutline,
            i = []
          return (
            e.forEach(function (t) {
              if (t.isHovered || t.isSelected) {
                var e = t.isHovered,
                  n = t.isSelected,
                  a = t.x,
                  s = t.y,
                  u = t.width,
                  l = t.height
                if ((o && n) || (r && e)) {
                  var c = t.getOutlineStyle(),
                    d = {}
                  if (
                    (Object.keys(c).forEach(function (t) {
                      'hover' !== t && (d[t] = c[t])
                    }),
                    e)
                  ) {
                    var p = c.hover
                    d = no(no({}, d), p)
                  }
                  i.push(
                    lo(
                      Pb,
                      no(
                        {
                          transform: t.transform,
                          className: 'lf-outline-node',
                          x: a,
                          y: s,
                          width: u + 10,
                          height: l + 10
                        },
                        d
                      )
                    )
                  )
                }
              }
            }),
            i
          )
        }),
        (n.prototype.getEdgeOutline = function () {
          for (
            var e = this.props.graphModel,
              n = e.edges,
              r = e.editConfigModel,
              o = r.edgeSelectedOutline,
              i = r.hoverOutline,
              a = [],
              s = 0;
            s < n.length;
            s++
          ) {
            var u = n[s]
            ;((o && u.isSelected) || (i && u.isHovered)) &&
              (u.modelType === t.ModelType.LINE_EDGE
                ? a.push(this.getLineOutline(u))
                : u.modelType === t.ModelType.POLYLINE_EDGE
                ? a.push(this.getPolylineOutline(u))
                : u.modelType === t.ModelType.BEZIER_EDGE &&
                  a.push(this.getBezierOutline(u)))
          }
          return a
        }),
        (n.prototype.getLineOutline = function (t) {
          var e = t.startPoint,
            n = t.endPoint,
            r = (e.x + n.x) / 2,
            o = (e.y + n.y) / 2,
            i = Math.abs(e.x - n.x) + 10,
            a = Math.abs(e.y - n.y) + 10,
            s = t.getOutlineStyle()
          return lo(
            Pb,
            no(
              { className: 'lf-outline-edge', x: r, y: o, width: i, height: a },
              s
            )
          )
        }),
        (n.prototype.getPolylineOutline = function (t) {
          var e = t.points,
            n = um(e),
            r = z_(n, 8),
            o = r.x,
            i = r.y,
            a = r.width,
            s = r.height,
            u = t.getOutlineStyle()
          return lo(
            Pb,
            no({ className: 'lf-outline', x: o, y: i, width: a, height: s }, u)
          )
        }),
        (n.prototype.getBezierOutline = function (t) {
          var e = t.path,
            n = ym(e),
            r = z_(n, 8),
            o = r.x,
            i = r.y,
            a = r.width,
            s = r.height,
            u = t.getOutlineStyle()
          return lo(
            Pb,
            no({ className: 'lf-outline', x: o, y: i, width: a, height: s }, u)
          )
        }),
        (n.prototype.render = function () {
          return lo('g', {
            className: 'lf-outline',
            children: [this.getNodesOutline(), this.getEdgeOutline()]
          })
        }),
        (n = oo([zE], n))
      )
    })(Fn),
    Dx = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this
      }
      return (
        eo(e, t),
        (e.prototype.render = function () {
          var t = this.props.snaplineModel,
            e = null != t ? t : {},
            n = e.position,
            r = e.isShowHorizontal,
            o = e.isShowVertical,
            i = null == t ? void 0 : t.getStyle(),
            a = null != n ? n : {},
            s = a.x,
            u = void 0 === s ? 0 : s,
            l = a.y,
            c = void 0 === l ? 0 : l,
            d = no(no({ x1: -1e5, y1: c, x2: 1e5, y2: c }, i), {
              stroke: r ? (null == i ? void 0 : i.stroke) : 'none'
            }),
            p = no(no({ x1: u, y1: -1e5, x2: u, y2: 1e5 }, i), {
              stroke: o ? (null == i ? void 0 : i.stroke) : 'none'
            })
          return lo('g', {
            className: 'lf-snapline',
            children: [lo(Nb, no({}, d)), lo(Nb, no({}, p))]
          })
        }),
        (e = oo([zE], e))
      )
    })(Fn),
    Nx = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this
      }
      return (
        eo(e, t),
        (e.prototype.componentDidMount = function () {
          this.triggerToolRender()
        }),
        (e.prototype.componentDidUpdate = function () {
          this.triggerToolRender()
        }),
        (e.prototype.getTools = function () {
          var t = this.props,
            e = t.tool,
            n = t.graphModel,
            r = n.textEditElement,
            o = e.getTools().map(function (t) {
              return Xn(t, {
                textEditElement: r,
                graphModel: n,
                lf: e.instance
              })
            })
          return (e.components = o), o
        }),
        (e.prototype.triggerToolRender = function () {
          var t = this.props,
            e = t.tool,
            n = t.graphModel,
            r = document.querySelector('#ToolOverlay_'.concat(n.flowId)),
            o = e.getInstance()
          o.components.forEach(function (t) {
            return t(o, r)
          }),
            (o.components = [])
        }),
        (e.prototype.render = function () {
          var t = this.props.graphModel
          return lo('div', {
            className: 'lf-tool-overlay',
            id: 'ToolOverlay_'.concat(t.flowId),
            children: this.getTools()
          })
        }),
        (e = oo([zE], e))
      )
    })(Fn),
    Px = (function () {
      function e(e) {
        var n,
          r,
          o = this
        ;(this.modelMap = new Map()),
          (this.nodeModelMap = new Map()),
          (this.edgeModelMap = new Map()),
          (this.elementsModelMap = new Map()),
          (this.nodeMoveRules = []),
          (this.nodeResizeRules = []),
          (this.nodes = []),
          (this.edges = []),
          (this.overlapMode = t.OverlapMode.DEFAULT),
          (this.gridSize = 1),
          (this.partial = !1),
          (this.waitCleanEffects = [])
        var i = e.container,
          a = e.partial,
          s = e.background,
          u = void 0 === s ? {} : s,
          l = e.grid,
          c = e.idGenerator,
          d = e.edgeGenerator,
          p = e.animation,
          h = e.customTrajectory
        ;(this.rootEl = i),
          (this.partial = !!a),
          (this.background = u),
          'object' == typeof l && e.snapGrid && (this.gridSize = l.size || 1),
          (this.theme = Qb(e.style)),
          (this.grid = wx.getGridOptions(null != l && l)),
          (this.edgeType = e.edgeType || 'polyline'),
          (this.animation = c_(p)),
          (this.overlapMode = e.overlapMode || t.OverlapMode.DEFAULT),
          (this.width =
            null !== (n = e.width) && void 0 !== n
              ? n
              : this.rootEl.getBoundingClientRect().width),
          (this.isContainerWidth = Of(e.width)),
          (this.height =
            null !== (r = e.height) && void 0 !== r
              ? r
              : this.rootEl.getBoundingClientRect().height),
          (this.isContainerHeight = Of(e.height))
        var f = new ResizeObserver(
          xp(function (t) {
            var e, n
            try {
              for (var r = io(t), i = r.next(); !i.done; i = r.next()) {
                var a = i.value
                a.target === o.rootEl &&
                  (o.resize(),
                  o.eventCenter.emit('graph:resize', {
                    target: o.rootEl,
                    contentRect: a.contentRect
                  }))
              }
            } catch (t) {
              e = { error: t }
            } finally {
              try {
                i && !i.done && (n = r.return) && n.call(r)
              } finally {
                if (e) throw e.error
              }
            }
          }, 16)
        )
        f.observe(this.rootEl),
          this.waitCleanEffects.push(function () {
            f.disconnect()
          }),
          (this.eventCenter = new xx()),
          (this.editConfigModel = new bx(e)),
          (this.transformModel = new Lx(this.eventCenter, e)),
          (this.flowId = Mb()),
          (this.idGenerator = c),
          (this.edgeGenerator = Em(this, d)),
          (this.customTrajectory = h)
      }
      return (
        Object.defineProperty(e.prototype, 'nodesMap', {
          get: function () {
            return this.nodes.reduce(function (t, e, n) {
              return (t[e.id] = { index: n, model: e }), t
            }, {})
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'edgesMap', {
          get: function () {
            return this.edges.reduce(function (t, e, n) {
              return (t[e.id] = { index: n, model: e }), t
            }, {})
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'modelsMap', {
          get: function () {
            return so(so([], ao(this.nodes), !1), ao(this.edges), !1).reduce(
              function (t, e) {
                return (t[e.id] = e), t
              },
              {}
            )
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'sortElements', {
          get: function () {
            for (
              var t = so(so([], ao(this.nodes), !1), ao(this.edges), !1).sort(
                  function (t, e) {
                    return t.zIndex - e.zIndex
                  }
                ),
                e = [],
                n = [-200, -200],
                r = [this.width + x_, this.height + x_],
                o = 0;
              o < t.length;
              o++
            ) {
              var i = t[o]
              i.visible &&
                (!this.partial ||
                  i.isSelected ||
                  this.isElementInArea(i, n, r, !1, !1)) &&
                e.push(i)
            }
            return e
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'textEditElement', {
          get: function () {
            var e = this.nodes.find(function (e) {
                return e.state === t.ElementState.TEXT_EDIT
              }),
              n = this.edges.find(function (e) {
                return e.state === t.ElementState.TEXT_EDIT
              })
            return e || n
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'selectElements', {
          get: function () {
            var t = new Map()
            return (
              this.nodes.forEach(function (e) {
                e.isSelected && t.set(e.id, e)
              }),
              this.edges.forEach(function (e) {
                e.isSelected && t.set(e.id, e)
              }),
              t
            )
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, 'selectNodes', {
          get: function () {
            var t = []
            return (
              this.nodes.forEach(function (e) {
                e.isSelected && t.push(e)
              }),
              t
            )
          },
          enumerable: !1,
          configurable: !0
        }),
        (e.prototype.getAreaElement = function (t, e, n, r, o) {
          var i = this
          void 0 === n && (n = !0),
            void 0 === r && (r = !0),
            void 0 === o && (o = !1)
          var a = []
          return (
            Fp(
              so(so([], ao(this.nodes), !1), ao(this.edges), !1),
              function (s) {
                var u = i.isElementInArea(s, t, e, n, r)
                ;(o && !s.visible) || !u || a.push(s)
              }
            ),
            a
          )
        }),
        (e.prototype.getModel = function (t) {
          return this.modelMap.get(t)
        }),
        (e.prototype.getNodeModelById = function (t) {
          var e
          return this.fakeNode && t === this.fakeNode.id
            ? this.fakeNode
            : null === (e = this.nodesMap[t]) || void 0 === e
            ? void 0
            : e.model
        }),
        (e.prototype.getPointByClient = function (t) {
          var e = t.x,
            n = t.y,
            r = this.rootEl.getBoundingClientRect(),
            o = { x: e - r.left, y: n - r.top },
            i = ao(this.transformModel.HtmlPointToCanvasPoint([o.x, o.y]), 2)
          return {
            domOverlayPosition: o,
            canvasOverlayPosition: { x: i[0], y: i[1] }
          }
        }),
        (e.prototype.isElementInArea = function (e, n, r, o, i) {
          var a
          if (
            (void 0 === o && (o = !0),
            void 0 === i && (i = !0),
            e.BaseType === t.ElementType.NODE)
          ) {
            for (
              var s = Wm(e),
                u = s.minX,
                l = s.minY,
                c = s.maxX,
                d = s.maxY,
                p = [
                  { x: u, y: l },
                  { x: c, y: l },
                  { x: c, y: d },
                  { x: u, y: d }
                ],
                h = i,
                f = 0;
              f < p.length;
              f++
            ) {
              var v = p[f],
                y = v.x,
                g = v.y
              if (
                ((y = (a = ao(
                  this.transformModel.CanvasPointToHtmlPoint([y, g]),
                  2
                ))[0]),
                (g = a[1]),
                Am([y, g], n, r) !== i)
              ) {
                h = !i
                break
              }
            }
            return h
          }
          if (e.BaseType === t.ElementType.EDGE) {
            var _ = e.startPoint,
              m = e.endPoint,
              b = this.transformModel.CanvasPointToHtmlPoint([_.x, _.y]),
              x = this.transformModel.CanvasPointToHtmlPoint([m.x, m.y]),
              E = Am(b, n, r),
              M = Am(x, n, r)
            return o ? E && M : E || M
          }
          return !1
        }),
        (e.prototype.graphDataToModel = function (t) {
          var e = this
          if (t)
            if (
              (this.elementsModelMap.clear(),
              this.nodeModelMap.clear(),
              this.edgeModelMap.clear(),
              t.nodes
                ? (this.nodes = Mh(t.nodes, function (t) {
                    var n = e.getModelAfterSnapToGrid(t)
                    return (
                      e.elementsModelMap.set(n.id, n),
                      e.nodeModelMap.set(n.id, n),
                      n
                    )
                  }))
                : (this.nodes = []),
              t.edges)
            ) {
              var n = this.edgeType
              this.edges = Mh(t.edges, function (t) {
                var r,
                  o = e.getModel(null !== (r = t.type) && void 0 !== r ? r : n)
                if (!o) throw new Error('找不到'.concat(t.type, '对应的边。'))
                var i = new o(t, e)
                return (
                  e.edgeModelMap.set(i.id, i),
                  e.elementsModelMap.set(i.id, i),
                  i
                )
              })
            } else this.edges = []
          else this.clearData()
        }),
        (e.prototype.modelToGraphData = function () {
          var t = []
          this.edges.forEach(function (e) {
            var n = e.getData()
            n && !e.virtual && t.push(n)
          })
          var e = []
          return (
            this.nodes.forEach(function (t) {
              var n = t.getData()
              n && !t.virtual && e.push(n)
            }),
            { nodes: e, edges: t }
          )
        }),
        (e.prototype.modelToHistoryData = function () {
          for (var t = !1, e = [], n = 0; n < this.nodes.length; n++) {
            var r = this.nodes[n]
            if (r.isDragging) {
              t = !0
              break
            }
            e.push(r.getHistoryData())
          }
          if (t) return !1
          for (var o = !1, i = [], a = 0; a < this.edges.length; a++) {
            var s = this.edges[a]
            if (s.isDragging) {
              o = !0
              break
            }
            i.push(s.getHistoryData())
          }
          return !o && { nodes: e, edges: i }
        }),
        (e.prototype.getEdgeModelById = function (t) {
          var e
          return null === (e = this.edgesMap[t]) || void 0 === e
            ? void 0
            : e.model
        }),
        (e.prototype.getElement = function (t) {
          return this.modelsMap[t]
        }),
        (e.prototype.getNodeEdges = function (t) {
          for (var e = [], n = 0; n < this.edges.length; n++) {
            var r = this.edges[n],
              o = r.sourceNodeId === t,
              i = r.targetNodeId === t
            ;(o || i) && e.push(r)
          }
          return e
        }),
        (e.prototype.getSelectElements = function (e) {
          void 0 === e && (e = !0)
          var n = this.selectElements,
            r = { nodes: [], edges: [] }
          return (
            n.forEach(function (o) {
              if (
                (o.BaseType === t.ElementType.NODE && r.nodes.push(o.getData()),
                o.BaseType === t.ElementType.EDGE)
              ) {
                var i = o.getData(),
                  a = n.get(i.sourceNodeId) && n.get(i.targetNodeId)
                ;(e || a) && r.edges.push(i)
              }
            }),
            r
          )
        }),
        (e.prototype.updateAttributes = function (t, e) {
          var n = this.getElement(t)
          null == n || n.updateAttributes(e)
        }),
        (e.prototype.changeNodeId = function (t, e) {
          return (
            e || (e = Mb()),
            this.nodesMap[e]
              ? ''
              : this.nodesMap[t]
              ? (this.edges.forEach(function (n) {
                  n.sourceNodeId === t && (n.sourceNodeId = e),
                    n.targetNodeId === t && (n.targetNodeId = e)
                }),
                (this.nodesMap[t].model.id = e),
                (this.nodesMap[e] = this.nodesMap[t]),
                e)
              : ''
          )
        }),
        (e.prototype.changeEdgeId = function (t, e) {
          return (
            e || (e = Mb()),
            this.edgesMap[e]
              ? ''
              : this.edgesMap[t]
              ? (this.edges.forEach(function (n) {
                  n.id === t && n.changeEdgeId(e)
                }),
                e)
              : ''
          )
        }),
        (e.prototype.getTextModel = function (e) {
          var n = this.editConfigModel,
            r = n.textMode,
            o = n.nodeTextMode,
            i = n.edgeTextMode
          return e.BaseType === t.ElementType.NODE
            ? e.textMode || o || r || t.TextMode.TEXT
            : e.BaseType === t.ElementType.EDGE
            ? e.textMode || i || r || t.TextMode.TEXT
            : void 0
        }),
        (e.prototype.setTextMode = function (t, e) {
          this.editConfigModel.updateEditConfig({ textMode: t })
        }),
        (e.prototype.setFakeNode = function (t) {
          this.fakeNode = t
        }),
        (e.prototype.removeFakeNode = function () {
          this.fakeNode = null
        }),
        (e.prototype.setModel = function (t, e) {
          return this.modelMap.set(t, e)
        }),
        (e.prototype.toFront = function (e) {
          var n,
            r,
            o,
            i =
              (null === (n = this.nodesMap[e]) || void 0 === n
                ? void 0
                : n.model) ||
              (null === (r = this.edgesMap[e]) || void 0 === r
                ? void 0
                : r.model)
          i &&
            (this.overlapMode === t.OverlapMode.DEFAULT &&
              (null === (o = this.topElement) || void 0 === o || o.setZIndex(),
              i.setZIndex(9999),
              (this.topElement = i)),
            this.overlapMode === t.OverlapMode.INCREASE &&
              this.setElementZIndex(e, 'top'))
        }),
        (e.prototype.setElementZIndex = function (t, e) {
          var n,
            r,
            o =
              (null === (n = this.nodesMap[t]) || void 0 === n
                ? void 0
                : n.model) ||
              (null === (r = this.edgesMap[t]) || void 0 === r
                ? void 0
                : r.model)
          if (o) {
            var i = void 0
            'number' == typeof e
              ? (i = e)
              : ('top' === e && (i = rx()), 'bottom' === e && (i = ox())),
              o.setZIndex(i)
          }
        }),
        (e.prototype.deleteNode = function (e) {
          var n = this.nodesMap[e].model,
            r = n.getData()
          this.deleteEdgeBySource(e),
            this.deleteEdgeByTarget(e),
            this.nodes.splice(this.nodesMap[e].index, 1),
            this.eventCenter.emit(t.EventType.NODE_DELETE, {
              data: r,
              model: n
            })
        }),
        (e.prototype.addNode = function (e, n, r) {
          void 0 === n && (n = t.EventType.NODE_ADD)
          var o = h_(e),
            i = o.id
          i && this.nodesMap[i] && delete o.id
          var a = this.getModelAfterSnapToGrid(o)
          this.nodes.push(a)
          var s = { data: a.getData() }
          return r && (s.e = r), this.eventCenter.emit(n, s), a
        }),
        (e.prototype.getModelAfterSnapToGrid = function (t) {
          var e = this.getModel(t.type),
            n = this.editConfigModel.snapGrid
          if (!e)
            throw new Error(
              '找不到'.concat(
                t.type,
                '对应的节点，请确认是否已注册此类型节点。'
              )
            )
          var r = t.x,
            o = t.y
          r &&
            o &&
            ((t.x = Tm(r, this.gridSize, n)),
            (t.y = Tm(o, this.gridSize, n)),
            'object' == typeof t.text &&
              null !== t.text &&
              ((t.text.x += t.x - r), (t.text.y += t.y - o)))
          var i = new e(t, this)
          return (
            this.nodeModelMap.set(i.id, i),
            this.elementsModelMap.set(i.id, i),
            i
          )
        }),
        (e.prototype.cloneNode = function (t) {
          var e = this.getNodeModelById(t),
            n = null == e ? void 0 : e.getData()
          if (n) {
            ;(n.x += 30),
              (n.y += 30),
              (n.id = ''),
              'object' == typeof n.text &&
                null !== n.text &&
                ((n.text.x += 30), (n.text.y += 30))
            var r = this.addNode(n)
            return (
              r.setSelected(!0), null == e || e.setSelected(!1), r.getData()
            )
          }
        }),
        (e.prototype.moveNode = function (t, e, n, r) {
          var o
          void 0 === r && (r = !1)
          var i = this.nodesMap[t]
          i &&
            ((e = (o = ao(i.model.getMoveDistance(e, n, r), 2))[0]),
            (n = o[1]),
            this.moveEdge(t, e, n))
        }),
        (e.prototype.moveNode2Coordinate = function (t, e, n, r) {
          void 0 === r && (r = !1)
          var o = this.nodesMap[t]
          if (o) {
            var i = o.model,
              a = e - i.x,
              s = n - i.y
            this.moveNode(t, a, s, r)
          }
        }),
        (e.prototype.editText = function (e) {
          this.setElementStateById(e, t.ElementState.TEXT_EDIT)
        }),
        (e.prototype.addEdge = function (e) {
          var n = h_(e),
            r = n.type
          r || (r = this.edgeType), n.id && this.edgesMap[n.id] && delete n.id
          var o = this.getModel(r)
          if (!o)
            throw new Error(
              '找不到'.concat(r, '对应的边，请确认是否已注册此类型边。')
            )
          var i = new o(no(no({}, n), { type: r }), this)
          this.edgeModelMap.set(i.id, i), this.elementsModelMap.set(i.id, i)
          var a = i.getData()
          return (
            this.edges.push(i),
            this.eventCenter.emit(t.EventType.EDGE_ADD, { data: a }),
            i
          )
        }),
        (e.prototype.moveEdge = function (t, e, n) {
          for (var r = 0; r < this.edges.length; r++) {
            var o = this.edges[r],
              i = o.textPosition,
              a = i.x,
              s = i.y,
              u = this.edges[r].sourceNodeId === t,
              l = this.edges[r].targetNodeId === t
            u && o.moveStartPoint(e, n),
              l && o.moveEndPoint(e, n),
              (u || l) && this.handleEdgeTextMove(o, a, s)
          }
        }),
        (e.prototype.handleEdgeTextMove = function (e, n, r) {
          var o
          if (e.customTextPosition) e.resetTextPosition()
          else {
            if (
              e.modelType === t.ModelType.POLYLINE_EDGE &&
              (null === (o = e.text) || void 0 === o ? void 0 : o.value)
            ) {
              var i = e.text,
                a = mm(i, e.points)
              e.moveText(a.x - i.x, a.y - i.y)
            }
            var s = e.textPosition,
              u = s.x,
              l = s.y
            e.moveText(u - n, l - r)
          }
        }),
        (e.prototype.deleteEdgeBySourceAndTarget = function (e, n) {
          for (var r = 0; r < this.edges.length; r++)
            if (
              this.edges[r].sourceNodeId === e &&
              this.edges[r].targetNodeId === n
            ) {
              var o = this.edges[r].getData()
              this.edges.splice(r, 1),
                r--,
                this.eventCenter.emit(t.EventType.EDGE_DELETE, { data: o })
            }
        }),
        (e.prototype.deleteEdgeById = function (e) {
          if (this.edgesMap[e]) {
            var n = this.edgesMap[e].index,
              r = this.edgesMap[e].model.getData()
            this.edges.splice(n, 1),
              this.eventCenter.emit(t.EventType.EDGE_DELETE, { data: r })
          }
        }),
        (e.prototype.deleteEdgeBySource = function (e) {
          for (var n = 0; n < this.edges.length; n++)
            if (this.edges[n].sourceNodeId === e) {
              var r = this.edges[n].getData()
              this.edges.splice(n, 1),
                n--,
                this.eventCenter.emit(t.EventType.EDGE_DELETE, { data: r })
            }
        }),
        (e.prototype.deleteEdgeByTarget = function (e) {
          for (var n = 0; n < this.edges.length; n++)
            if (this.edges[n].targetNodeId === e) {
              var r = this.edges[n].getData()
              this.edges.splice(n, 1),
                n--,
                this.eventCenter.emit(t.EventType.EDGE_DELETE, { data: r })
            }
        }),
        (e.prototype.setElementStateById = function (e, n, r) {
          this.nodes.forEach(function (o) {
            o.id === e
              ? o.setElementState(n, r)
              : o.setElementState(t.ElementState.DEFAULT)
          }),
            this.edges.forEach(function (o) {
              o.id === e
                ? o.setElementState(n, r)
                : o.setElementState(t.ElementState.DEFAULT)
            })
        }),
        (e.prototype.updateText = function (t, e) {
          var n = vh(
            so(so([], ao(this.nodes), !1), ao(this.edges), !1),
            function (e) {
              return e.id === t
            }
          )
          null == n || n.updateText(e)
        }),
        (e.prototype.selectNodeById = function (t, e) {
          var n
          void 0 === e && (e = !1), e || this.clearSelectElements()
          var r =
            null === (n = this.nodesMap[t]) || void 0 === n ? void 0 : n.model
          null == r || r.setSelected(!0)
        }),
        (e.prototype.selectEdgeById = function (t, e) {
          var n
          void 0 === e && (e = !1), e || this.clearSelectElements()
          var r =
            null === (n = this.edgesMap[t]) || void 0 === n ? void 0 : n.model
          null == r || r.setSelected(!0)
        }),
        (e.prototype.selectElementById = function (t, e) {
          void 0 === e && (e = !1), e || this.clearSelectElements()
          var n = this.getElement(t)
          null == n || n.setSelected(!0)
        }),
        (e.prototype.clearSelectElements = function () {
          var e
          this.selectElements.forEach(function (t) {
            null == t || t.setSelected(!1)
          }),
            this.selectElements.clear(),
            this.overlapMode === t.OverlapMode.DEFAULT &&
              (null === (e = this.topElement) || void 0 === e || e.setZIndex())
        }),
        (e.prototype.moveNodes = function (e, n, r, o) {
          var i,
            a,
            s,
            u = this
          void 0 === o && (o = !1)
          for (
            var l = e.reduce(function (t, e) {
                var i,
                  a =
                    null === (i = u.nodesMap[e]) || void 0 === i
                      ? void 0
                      : i.model
                return a && (t[e] = a.getMoveDistance(n, r, o)), t
              }, {}),
              c = 0;
            c < this.edges.length;
            c++
          ) {
            var d = this.edges[c],
              p = d.textPosition,
              h = p.x,
              f = p.y,
              v = l[d.sourceNodeId],
              y = l[d.targetNodeId],
              g = void 0,
              _ = void 0
            v && y && d.modelType === t.ModelType.POLYLINE_EDGE
              ? ((g = (i = ao(v, 2))[0]), (_ = i[1]), d.updatePointsList(g, _))
              : (v &&
                  ((g = (a = ao(v, 2))[0]), (_ = a[1]), d.moveStartPoint(g, _)),
                y &&
                  ((g = (s = ao(y, 2))[0]), (_ = s[1]), d.moveEndPoint(g, _))),
              (v || y) && this.handleEdgeTextMove(d, h, f)
          }
        }),
        (e.prototype.addNodeMoveRules = function (t) {
          this.nodeMoveRules.includes(t) || this.nodeMoveRules.push(t)
        }),
        (e.prototype.addNodeResizeRules = function (t) {
          this.nodeResizeRules.includes(t) || this.nodeResizeRules.push(t)
        }),
        (e.prototype.setDefaultEdgeType = function (t) {
          this.edgeType = t
        }),
        (e.prototype.changeNodeType = function (t, e) {
          var n = this.getNodeModelById(t)
          if (n) {
            var r = n.getData()
            r.type = e
            var o = this.getModel(e)
            if (!o)
              throw new Error(
                '找不到'.concat(e, '对应的节点，请确认是否已注册此类型节点。')
              )
            var i = new o(r, this)
            this.nodes.splice(this.nodesMap[t].index, 1, i),
              this.getNodeEdges(t).forEach(function (e) {
                if (e.sourceNodeId === t) {
                  var n = Qm(i, e.startPoint, i.width, i.height)
                  e.updateStartPoint(n)
                }
                if (e.targetNodeId === t) {
                  n = Qm(i, e.endPoint, i.width, i.height)
                  e.updateEndPoint(n)
                }
              })
          }
        }),
        (e.prototype.changeEdgeType = function (t, e) {
          var n = this.getEdgeModelById(t)
          if (n && n.type !== e) {
            var r = n.getData()
            r.type = e
            var o = this.getModel(e)
            if (!o)
              throw new Error(
                '找不到'.concat(e, '对应的节点，请确认是否已注册此类型节点。')
              )
            delete r.pointsList
            var i = new o(r, this)
            this.edges.splice(this.edgesMap[t].index, 1, i)
          }
        }),
        (e.prototype.getNodeIncomingEdge = function (t) {
          var e = []
          return (
            this.edges.forEach(function (n) {
              n.targetNodeId === t && e.push(n)
            }),
            e
          )
        }),
        (e.prototype.getNodeOutgoingEdge = function (t) {
          var e = []
          return (
            this.edges.forEach(function (n) {
              n.sourceNodeId === t && e.push(n)
            }),
            e
          )
        }),
        (e.prototype.getAnchorIncomingEdge = function (t) {
          var e = []
          return (
            this.edges.forEach(function (n) {
              n.targetAnchorId === t && e.push(n)
            }),
            e
          )
        }),
        (e.prototype.getAnchorOutgoingEdge = function (t) {
          var e = []
          return (
            this.edges.forEach(function (n) {
              n.sourceAnchorId === t && e.push(n)
            }),
            e
          )
        }),
        (e.prototype.getNodeIncomingNode = function (t) {
          var e = this,
            n = []
          return (
            this.edges.forEach(function (r) {
              var o
              r.targetNodeId === t &&
                n.push(
                  null === (o = e.nodesMap[r.sourceNodeId]) || void 0 === o
                    ? void 0
                    : o.model
                )
            }),
            n
          )
        }),
        (e.prototype.getNodeOutgoingNode = function (t) {
          var e = this,
            n = []
          return (
            this.edges.forEach(function (r) {
              r.sourceNodeId === t && n.push(e.nodesMap[r.targetNodeId].model)
            }),
            n
          )
        }),
        (e.prototype.setTheme = function (t) {
          this.theme = tx(no(no({}, this.theme), t))
        }),
        (e.prototype.updateGridOptions = function (t) {
          Kf(this.grid, t)
        }),
        (e.prototype.updateGridSize = function (t) {
          this.gridSize = t
        }),
        (e.prototype.updateBackgroundOptions = function (t) {
          vf(t) || vf(this.background)
            ? (this.background = t)
            : (this.background = no(no({}, this.background), t))
        }),
        (e.prototype.resize = function (t, e) {
          ;(this.width =
            null != t ? t : this.rootEl.getBoundingClientRect().width),
            (this.isContainerWidth = Of(t)),
            (this.height =
              null != e ? e : this.rootEl.getBoundingClientRect().height),
            (this.isContainerHeight = Of(e)),
            !this.width || this.height
        }),
        (e.prototype.clearData = function () {
          ;(this.nodes = []),
            (this.edges = []),
            this.edgeModelMap.clear(),
            this.nodeModelMap.clear(),
            this.elementsModelMap.clear()
        }),
        (e.prototype.getVirtualRectSize = function () {
          var t = this.nodes,
            e = [],
            n = []
          t.forEach(function (t) {
            var r = t.x,
              o = t.y,
              i = t.width,
              a = t.height,
              s = t.getNodeStyle().strokeWidth,
              u = void 0 === s ? 0 : s,
              l = r + i / 2 + u,
              c = r - i / 2 - u,
              d = o + a / 2 + u,
              p = o - a / 2 - u
            ;(e = e.concat(
              [l, c].filter(function (t) {
                return !Number.isNaN(t)
              })
            )),
              (n = n.concat(
                [d, p].filter(function (t) {
                  return !Number.isNaN(t)
                })
              ))
          })
          var r = Math.min.apply(Math, so([], ao(e), !1)),
            o = Math.max.apply(Math, so([], ao(e), !1)),
            i = Math.min.apply(Math, so([], ao(n), !1)),
            a = o - r || 0,
            s = Math.max.apply(Math, so([], ao(n), !1)) - i || 0
          return { width: a, height: s, x: r + a / 2, y: i + s / 2 }
        }),
        (e.prototype.translateCenter = function () {
          var t = this,
            e = t.nodes,
            n = t.width,
            r = t.height,
            o = t.rootEl,
            i = t.transformModel
          if (e.length) {
            var a = n || o.clientWidth,
              s = r || o.clientHeight,
              u = this.getVirtualRectSize(),
              l = u.x,
              c = u.y
            i.focusOn(l, c, a, s)
          }
        }),
        (e.prototype.fitView = function (t, e) {
          void 0 === t && (t = 20), void 0 === e && (e = 20)
          var n = this,
            r = n.nodes,
            o = n.width,
            i = n.height,
            a = n.rootEl,
            s = n.transformModel
          if (r.length) {
            var u = o || a.clientWidth,
              l = i || a.clientHeight,
              c = this.getVirtualRectSize(),
              d = c.width,
              p = c.height,
              h = c.x,
              f = c.y,
              v = (d + e) / u,
              y = (p + t) / l,
              g = 1 / Math.max(v, y),
              _ = [u / 2, l / 2]
            s.zoom(g, _), s.focusOn(h, f, u, l)
          }
        }),
        (e.prototype.openEdgeAnimation = function (t) {
          var e = this.getEdgeModelById(t)
          null == e || e.openEdgeAnimation()
        }),
        (e.prototype.closeEdgeAnimation = function (t) {
          var e = this.getEdgeModelById(t)
          null == e || e.closeEdgeAnimation()
        }),
        (e.prototype.getPartial = function () {
          return this.partial
        }),
        (e.prototype.setPartial = function (t) {
          this.partial = t
        }),
        (e.prototype.destroy = function () {
          try {
            this.waitCleanEffects.forEach(function (t) {
              t()
            })
          } catch (t) {}
          ;(this.waitCleanEffects.length = 0), this.eventCenter.destroy()
        }),
        oo([$], e.prototype, 'width', void 0),
        oo([$], e.prototype, 'height', void 0),
        oo([$], e.prototype, 'grid', void 0),
        oo([$], e.prototype, 'edgeType', void 0),
        oo([$], e.prototype, 'nodes', void 0),
        oo([$], e.prototype, 'edges', void 0),
        oo([$], e.prototype, 'fakeNode', void 0),
        oo([$], e.prototype, 'overlapMode', void 0),
        oo([$], e.prototype, 'background', void 0),
        oo([$], e.prototype, 'gridSize', void 0),
        oo([$], e.prototype, 'transformModel', void 0),
        oo([$], e.prototype, 'editConfigModel', void 0),
        oo([$], e.prototype, 'partial', void 0),
        oo([rt], e.prototype, 'nodesMap', null),
        oo([rt], e.prototype, 'edgesMap', null),
        oo([rt], e.prototype, 'modelsMap', null),
        oo([rt], e.prototype, 'sortElements', null),
        oo([rt], e.prototype, 'textEditElement', null),
        oo([rt], e.prototype, 'selectElements', null),
        oo([rt], e.prototype, 'selectNodes', null),
        oo([te], e.prototype, 'setTextMode', null),
        oo([te], e.prototype, 'setFakeNode', null),
        oo([te], e.prototype, 'removeFakeNode', null),
        oo([te], e.prototype, 'setModel', null),
        oo([te], e.prototype, 'toFront', null),
        oo([te], e.prototype, 'setElementZIndex', null),
        oo([te], e.prototype, 'deleteNode', null),
        oo([te], e.prototype, 'addNode', null),
        oo([te], e.prototype, 'cloneNode', null),
        oo([te], e.prototype, 'moveNode', null),
        oo([te], e.prototype, 'moveNode2Coordinate', null),
        oo([te], e.prototype, 'editText', null),
        oo([te], e.prototype, 'addEdge', null),
        oo([te], e.prototype, 'moveEdge', null),
        oo([te], e.prototype, 'deleteEdgeBySourceAndTarget', null),
        oo([te], e.prototype, 'deleteEdgeById', null),
        oo([te], e.prototype, 'deleteEdgeBySource', null),
        oo([te], e.prototype, 'deleteEdgeByTarget', null),
        oo([te], e.prototype, 'setElementStateById', null),
        oo([te], e.prototype, 'updateText', null),
        oo([te], e.prototype, 'selectNodeById', null),
        oo([te], e.prototype, 'selectEdgeById', null),
        oo([te], e.prototype, 'selectElementById', null),
        oo([te], e.prototype, 'clearSelectElements', null),
        oo([te], e.prototype, 'moveNodes', null),
        oo([te], e.prototype, 'setDefaultEdgeType', null),
        oo([te], e.prototype, 'changeNodeType', null),
        oo([te], e.prototype, 'changeEdgeType', null),
        oo([te], e.prototype, 'getNodeIncomingEdge', null),
        oo([te], e.prototype, 'getNodeOutgoingEdge', null),
        oo([te], e.prototype, 'getAnchorIncomingEdge', null),
        oo([te], e.prototype, 'getAnchorOutgoingEdge', null),
        oo([te], e.prototype, 'getNodeIncomingNode', null),
        oo([te], e.prototype, 'getNodeOutgoingNode', null),
        oo([te], e.prototype, 'setTheme', null),
        oo([te], e.prototype, 'resize', null),
        oo([te], e.prototype, 'clearData', null),
        oo([te], e.prototype, 'translateCenter', null),
        oo([te], e.prototype, 'fitView', null),
        oo([te], e.prototype, 'openEdgeAnimation', null),
        oo([te], e.prototype, 'closeEdgeAnimation', null),
        oo([te], e.prototype, 'setPartial', null),
        e
      )
    })(),
    Cx = (function () {
      function t(t) {
        ;(this.isShowHorizontal = !1),
          (this.isShowVertical = !1),
          (this.position = { x: 0, y: 0 }),
          (this.graphModel = t)
      }
      return (
        (t.prototype.getStyle = function () {
          return no({}, this.graphModel.theme.snapline)
        }),
        (t.prototype.getCenterSnapLine = function (t, e) {
          for (var n = t.x, r = t.y, o = !1, i = !1, a = 0; a < e.length; a++) {
            var s = e[a]
            if (
              s.id !== t.id &&
              (n === s.x && (o = !0), r === s.y && (i = !0), o && i)
            )
              break
          }
          return {
            isShowVertical: o,
            isShowHorizontal: i,
            position: { x: n, y: r }
          }
        }),
        (t.prototype.getHorizontalSnapline = function (t, e) {
          var n,
            r = !1,
            o = 0,
            i = t.id
          if (i) {
            var a = this.graphModel.fakeNode
            if (a && a.id === i) n = Wm(a)
            else {
              var s = this.graphModel.getNodeModelById(i)
              s && (n = Wm(s))
            }
          }
          for (var u = 0; u < e.length; u++) {
            var l = e[u]
            if (l.id !== t.id) {
              var c = Wm(l)
              if (
                c.minY === (null == n ? void 0 : n.minY) ||
                c.maxY === (null == n ? void 0 : n.minY)
              ) {
                ;(r = !0), (o = n.minY)
                break
              }
              if (
                c.minY === (null == n ? void 0 : n.maxY) ||
                c.maxY === (null == n ? void 0 : n.maxY)
              ) {
                ;(r = !0), (o = n.maxY)
                break
              }
            }
          }
          return {
            isShowHorizontal: r,
            isShowVertical: this.isShowVertical,
            position: no(no({}, this.position), { y: o })
          }
        }),
        (t.prototype.getVerticalSnapline = function (t, e) {
          var n,
            r = !1,
            o = 0,
            i = t.id
          if (i) {
            var a = this.graphModel.fakeNode
            if (a && a.id === i) n = Wm(a)
            else {
              var s = this.graphModel.getNodeModelById(i)
              s && (n = Wm(s))
            }
          }
          for (var u = 0; u < e.length; u++) {
            var l = e[u]
            if (l.id !== t.id) {
              var c = Wm(l)
              if (
                c.minX === (null == n ? void 0 : n.minX) ||
                c.maxX === (null == n ? void 0 : n.minX)
              ) {
                ;(r = !0), (o = n.minX)
                break
              }
              if (
                c.minX === (null == n ? void 0 : n.maxX) ||
                c.maxX === (null == n ? void 0 : n.maxX)
              ) {
                ;(r = !0), (o = n.maxX)
                break
              }
            }
          }
          return {
            isShowHorizontal: this.isShowHorizontal,
            isShowVertical: r,
            position: no(no({}, this.position), { x: o })
          }
        }),
        (t.prototype.getSnapLinePosition = function (t, e) {
          var n = this.getCenterSnapLine(t, e),
            r = n.isShowHorizontal,
            o = n.isShowVertical
          if (!r) {
            var i = this.getHorizontalSnapline(t, e)
            i.isShowHorizontal &&
              ((n.isShowHorizontal = i.isShowHorizontal),
              (n.position.y = i.position.y))
          }
          if (!o) {
            var a = this.getVerticalSnapline(t, e)
            a.isShowVertical &&
              ((n.isShowVertical = a.isShowVertical),
              (n.position.x = a.position.x))
          }
          return n
        }),
        (t.prototype.setSnaplineInfo = function (t) {
          var e = t.isShowHorizontal,
            n = t.isShowVertical,
            r = t.position
          ;(this.position = r),
            (this.isShowHorizontal = e),
            (this.isShowVertical = n)
        }),
        (t.prototype.clearSnapline = function () {
          ;(this.position = { x: 0, y: 0 }),
            (this.isShowHorizontal = !1),
            (this.isShowVertical = !1)
        }),
        (t.prototype.setNodeSnapLine = function (t) {
          var e = this.graphModel.nodes,
            n = this.getSnapLinePosition(t, e)
          this.setSnaplineInfo(n)
        }),
        oo([$], t.prototype, 'isShowHorizontal', void 0),
        oo([$], t.prototype, 'isShowVertical', void 0),
        oo([$], t.prototype, 'position', void 0),
        oo([te], t.prototype, 'clearSnapline', null),
        oo([te], t.prototype, 'setNodeSnapLine', null),
        t
      )
    })(),
    Ix = {
      false: [-1 / 0, -1 / 0, 1 / 0, 1 / 0],
      true: [-1 / 0, -1 / 0, 1 / 0, 1 / 0],
      vertical: [-1 / 0, 0, 1 / 0, 0],
      horizontal: [0, -1 / 0, 0, 1 / 0]
    },
    Lx = (function () {
      function e(t, e) {
        ;(this.MINI_SCALE_SIZE = 0.2),
          (this.MAX_SCALE_SIZE = 16),
          (this.SCALE_X = 1),
          (this.SKEW_Y = 0),
          (this.SKEW_X = 0),
          (this.SCALE_Y = 1),
          (this.TRANSLATE_X = 0),
          (this.TRANSLATE_Y = 0),
          (this.ZOOM_SIZE = 0.04),
          (this.translateLimitMinX = -1 / 0),
          (this.translateLimitMinY = -1 / 0),
          (this.translateLimitMaxX = 1 / 0),
          (this.translateLimitMaxY = 1 / 0),
          (this.eventCenter = t)
        var n = e.stopMoveGraph,
          r = void 0 !== n && n
        this.updateTranslateLimits(r)
      }
      return (
        (e.prototype.setZoomMiniSize = function (t) {
          this.MINI_SCALE_SIZE = t
        }),
        (e.prototype.setZoomMaxSize = function (t) {
          this.MAX_SCALE_SIZE = t
        }),
        (e.prototype.HtmlPointToCanvasPoint = function (t) {
          var e = ao(t, 2),
            n = e[0],
            r = e[1]
          return [
            (n - this.TRANSLATE_X) / this.SCALE_X,
            (r - this.TRANSLATE_Y) / this.SCALE_Y
          ]
        }),
        (e.prototype.CanvasPointToHtmlPoint = function (t) {
          var e = ao(t, 2),
            n = e[0],
            r = e[1]
          return [
            n * this.SCALE_X + this.TRANSLATE_X,
            r * this.SCALE_Y + this.TRANSLATE_Y
          ]
        }),
        (e.prototype.moveCanvasPointByHtml = function (t, e, n) {
          var r = ao(t, 2),
            o = r[0],
            i = r[1]
          return [o + e / this.SCALE_X, i + n / this.SCALE_Y]
        }),
        (e.prototype.fixDeltaXY = function (t, e) {
          return [t / this.SCALE_X, e / this.SCALE_Y]
        }),
        (e.prototype.getTransformStyle = function () {
          var t = [
            this.SCALE_X,
            this.SKEW_Y,
            this.SKEW_X,
            this.SCALE_Y,
            this.TRANSLATE_X,
            this.TRANSLATE_Y
          ].join(',')
          return { transform: 'matrix('.concat(t, ')') }
        }),
        (e.prototype.zoom = function (t, e) {
          void 0 === t && (t = !1)
          var n = this.SCALE_X,
            r = this.SCALE_Y
          return (
            'number' == typeof t
              ? ((n = t), (r = t))
              : t
              ? ((n += this.ZOOM_SIZE), (r += this.ZOOM_SIZE))
              : ((n -= this.ZOOM_SIZE), (r -= this.ZOOM_SIZE)),
            n < this.MINI_SCALE_SIZE ||
              n > this.MAX_SCALE_SIZE ||
              (e &&
                ((this.TRANSLATE_X -= (n - this.SCALE_X) * e[0]),
                (this.TRANSLATE_Y -= (r - this.SCALE_Y) * e[1])),
              (this.SCALE_X = n),
              (this.SCALE_Y = r),
              this.emitGraphTransform('zoom')),
            ''.concat(100 * this.SCALE_X, '%')
          )
        }),
        (e.prototype.emitGraphTransform = function (e) {
          this.eventCenter.emit(t.EventType.GRAPH_TRANSFORM, {
            type: e,
            transform: {
              SCALE_X: this.SCALE_X,
              SKEW_Y: this.SKEW_Y,
              SKEW_X: this.SKEW_X,
              SCALE_Y: this.SCALE_Y,
              TRANSLATE_X: this.TRANSLATE_X,
              TRANSLATE_Y: this.TRANSLATE_Y
            }
          })
        }),
        (e.prototype.resetZoom = function () {
          ;(this.SCALE_X = 1),
            (this.SCALE_Y = 1),
            this.emitGraphTransform('resetZoom')
        }),
        (e.prototype.translate = function (t, e) {
          this.TRANSLATE_X + t <= this.translateLimitMaxX &&
            this.TRANSLATE_X + t >= this.translateLimitMinX &&
            (this.TRANSLATE_X += t),
            this.TRANSLATE_Y + e <= this.translateLimitMaxY &&
              this.TRANSLATE_Y + e >= this.translateLimitMinY &&
              (this.TRANSLATE_Y += e),
            this.emitGraphTransform('translate')
        }),
        (e.prototype.focusOn = function (t, e, n, r) {
          var o = ao(this.CanvasPointToHtmlPoint([t, e]), 2),
            i = ao([n / 2 - o[0], r / 2 - o[1]], 2),
            a = i[0],
            s = i[1]
          ;(this.TRANSLATE_X += a),
            (this.TRANSLATE_Y += s),
            this.emitGraphTransform('focusOn')
        }),
        (e.prototype.updateTranslateLimits = function (t) {
          var e
          ;(e = ao(
            Array.isArray(t) && 4 === t.length ? t : Ix[t.toString()],
            4
          )),
            (this.translateLimitMinX = e[0]),
            (this.translateLimitMinY = e[1]),
            (this.translateLimitMaxX = e[2]),
            (this.translateLimitMaxY = e[3])
        }),
        oo([$], e.prototype, 'SCALE_X', void 0),
        oo([$], e.prototype, 'SKEW_Y', void 0),
        oo([$], e.prototype, 'SKEW_X', void 0),
        oo([$], e.prototype, 'SCALE_Y', void 0),
        oo([$], e.prototype, 'TRANSLATE_X', void 0),
        oo([$], e.prototype, 'TRANSLATE_Y', void 0),
        oo([$], e.prototype, 'ZOOM_SIZE', void 0),
        oo([te], e.prototype, 'zoom', null),
        oo([te], e.prototype, 'resetZoom', null),
        oo([te], e.prototype, 'translate', null),
        oo([te], e.prototype, 'focusOn', null),
        e
      )
    })(),
    jx = (function (e) {
      function n() {
        var t = e.apply(this, so([], ao(arguments), !1)) || this
        return (
          (t.handleResize = function () {
            var e = t.props,
              n = e.graphModel,
              r = e.options,
              o = n.width,
              i = n.height,
              a = o,
              s = i,
              u = !1
            n.isContainerWidth && ((a = void 0), (u = !0)),
              n.isContainerHeight && ((s = void 0), (u = !0)),
              u && n.resize(a, s),
              (r.width = o),
              (r.height = i)
          }),
          (t.throttleResize = ng(t.handleResize, 200)),
          t
        )
      }
      return (
        eo(n, e),
        (n.prototype.componentDidMount = function () {
          window.addEventListener('resize', this.throttleResize)
        }),
        (n.prototype.componentDidUpdate = function () {
          var e = this.props.graphModel.modelToGraphData()
          this.props.graphModel.eventCenter.emit(t.EventType.GRAPH_UPDATED, {
            data: e
          })
        }),
        (n.prototype.componentWillUnmount = function () {
          window.removeEventListener('resize', this.throttleResize)
        }),
        (n.prototype.getComponent = function (t, e, n) {
          void 0 === n && (n = 'canvas-overlay')
          var r = (0, this.props.getView)(t.type)
          return r ? lo(r, { model: t, graphModel: e, overlay: n }, t.id) : null
        }),
        (n.prototype.render = function () {
          var t = this,
            e = this.props,
            n = e.graphModel,
            r = e.tool,
            o = e.options,
            i = e.dnd,
            a = e.snaplineModel,
            s = {}
          o.width && (s.width = ''.concat(n.width, 'px')),
            o.height && (s.height = ''.concat(n.height, 'px'))
          var u = n.fakeNode,
            l = n.editConfigModel,
            c = n.background,
            d = l.adjustEdge
          return lo('div', {
            className: 'lf-graph',
            'flow-id': n.flowId,
            style: s,
            children: [
              lo(Ex, {
                graphModel: n,
                dnd: i,
                children: [
                  lo('g', {
                    className: 'lf-base',
                    children: Mh(n.sortElements, function (e) {
                      return t.getComponent(e, n)
                    })
                  }),
                  u ? this.getComponent(u, n) : ''
                ]
              }),
              lo(Ax, {
                graphModel: n,
                children: [
                  lo(Ox, { graphModel: n }),
                  d ? lo(Tx, { graphModel: n }) : '',
                  !1 !== o.snapline ? lo(Dx, { snaplineModel: a }) : ''
                ]
              }),
              lo(Nx, { graphModel: n, tool: r }),
              c && lo(Sx, { background: c }),
              lo(wx, { graphModel: n })
            ]
          })
        }),
        (n = oo([zE], n))
      )
    })(Fn),
    Rx = (function (e) {
      function n() {
        var n = e.call(this) || this
        return (
          (n.onDragStart = function (e) {
            var r = e.event,
              o = n.props,
              i = o.anchorData,
              a = o.nodeModel,
              s = o.graphModel
            s.selectNodeById(a.id),
              a.autoToFront && s.toFront(a.id),
              s.eventCenter.emit(t.EventType.ANCHOR_DRAGSTART, {
                data: i,
                e: r,
                nodeModel: a
              }),
              n.setState({ startX: i.x, startY: i.y, endX: i.x, endY: i.y })
          }),
          (n.onDragging = function (e) {
            var r = e.event,
              o = n.props,
              i = o.graphModel,
              a = o.nodeModel,
              s = o.anchorData,
              u = i.transformModel,
              l = i.eventCenter,
              c = i.width,
              d = i.height,
              p = i.editConfigModel,
              h = p.autoExpand,
              f = p.stopMoveGraph
            if (r) {
              var v = r.clientX,
                y = r.clientY,
                g = i.getPointByClient({ x: v, y: y }),
                _ = g.domOverlayPosition,
                m = _.x,
                b = _.y,
                x = g.canvasOverlayPosition,
                E = x.x,
                M = x.y
              n.t && Ab(n.t)
              var T = []
              m < 10
                ? (T = [10, 0])
                : m + 10 > c
                ? (T = [-10, 0])
                : b < 10
                ? (T = [0, 10])
                : b + 10 > d && (T = [0, -10]),
                n.setState({ endX: E, endY: M, dragging: !0 }),
                n.moveAnchorEnd(E, M),
                T.length > 0 &&
                  !f &&
                  h &&
                  (n.t = wb(function () {
                    var t = ao(T, 2),
                      e = t[0],
                      r = t[1]
                    u.translate(e, r)
                    var o = n.state,
                      i = o.endX,
                      a = o.endY
                    n.setState({ endX: i - e, endY: a - r }),
                      n.moveAnchorEnd(i - e, a - r)
                  })),
                l.emit(t.EventType.ANCHOR_DRAG, { data: s, e: r, nodeModel: a })
            }
          }),
          (n.onDragEnd = function (e) {
            var r = e.event
            n.t && Ab(n.t)
            var o = n.checkEnd(r)
            n.setState({
              startX: 0,
              startY: 0,
              endX: 0,
              endY: 0,
              dragging: !1
            }),
              n.sourceRuleResults.clear(),
              n.targetRuleResults.clear()
            var i = n.props,
              a = i.graphModel,
              s = i.nodeModel,
              u = i.anchorData
            a.eventCenter.emit(t.EventType.ANCHOR_DRAGEND, {
              data: u,
              e: r,
              nodeModel: s,
              edgeModel: null != o ? o : void 0
            })
          }),
          (n.checkEnd = function (e) {
            var r,
              o = n.props,
              i = o.graphModel,
              a = o.nodeModel,
              s = o.anchorData,
              u = s.x,
              l = s.y,
              c = s.id,
              d = n.state,
              p = d.endX,
              h = d.endY,
              f = d.dragging,
              v = Bm({ x: p, y: h }, i)
            if (
              (n.preTargetNode &&
                n.preTargetNode.state !== t.ElementState.DEFAULT &&
                n.preTargetNode.setElementState(t.ElementState.DEFAULT),
              f && v && v.node)
            ) {
              var y = v.node,
                g = v.anchor.id,
                _ = ''
                  .concat(a.id, '_')
                  .concat(y.id, '_')
                  .concat(g, '_')
                  .concat(c),
                m = n.sourceRuleResults.get(_) || {},
                b = m.isAllPass,
                x = m.msg,
                E = n.targetRuleResults.get(_) || {},
                M = E.isAllPass,
                T = E.msg
              if (b && M) {
                y.setElementState(t.ElementState.DEFAULT)
                var S = i.getNodeModelById(v.node.id),
                  w =
                    null === (r = i.edgeGenerator) || void 0 === r
                      ? void 0
                      : r.call(
                          i,
                          a.getData(),
                          null == S ? void 0 : S.getData()
                        ),
                  A = i.addEdge(
                    no(no({}, w), {
                      sourceNodeId: a.id,
                      sourceAnchorId: c,
                      startPoint: { x: u, y: l },
                      targetNodeId: v.node.id,
                      targetAnchorId: v.anchor.id,
                      endPoint: { x: v.anchor.x, y: v.anchor.y }
                    })
                  ),
                  O = n.props.anchorData
                return (
                  i.eventCenter.emit(t.EventType.ANCHOR_DROP, {
                    data: O,
                    e: e,
                    nodeModel: a,
                    edgeModel: A
                  }),
                  A
                )
              }
              var D = y.getData()
              return (
                i.eventCenter.emit(t.EventType.CONNECTION_NOT_ALLOWED, {
                  data: D,
                  msg: T || x || '不允许添加连线'
                }),
                null
              )
            }
          }),
          (n.sourceRuleResults = new Map()),
          (n.targetRuleResults = new Map()),
          (n.state = { startX: 0, startY: 0, endX: 0, endY: 0, dragging: !1 }),
          (n.dragHandler = new E_({
            onDragStart: n.onDragStart,
            onDragging: n.onDragging,
            onDragEnd: n.onDragEnd
          })),
          n
        )
      }
      return (
        eo(n, e),
        (n.prototype.getAnchorShape = function () {
          var t = this.props,
            e = t.anchorData,
            n = t.style,
            r = t.node.getAnchorShape(e)
          if (r) return r
          var o = e.x,
            i = e.y,
            a = no(no({}, n), null == n ? void 0 : n.hover)
          return lo('g', {
            children: [
              lo(
                Ib,
                no({ className: 'lf-node-anchor-hover' }, a, { x: o, y: i })
              ),
              lo(Ib, no({ className: 'lf-node-anchor' }, n, { x: o, y: i }))
            ]
          })
        }),
        Object.defineProperty(n.prototype, 'customTrajectory', {
          get: function () {
            return this.props.graphModel.customTrajectory
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(n.prototype, 'relateEdges', {
          get: function () {
            var t = this.props,
              e = t.graphModel,
              n = e.getAnchorIncomingEdge,
              r = e.getAnchorOutgoingEdge,
              o = t.anchorData.id
            return { incomingEdgeList: n(o), outgoingEdgeList: r(o) }
          },
          enumerable: !1,
          configurable: !0
        }),
        (n.prototype.moveAnchorEnd = function (e, n) {
          var r,
            o,
            i = this.props,
            a = i.graphModel,
            s = i.nodeModel,
            u = i.anchorData,
            l = Bm({ x: e, y: n }, a)
          if (l) {
            var c = l.node,
              d = l.anchor.id
            if (
              (this.preTargetNode &&
                this.preTargetNode !== l.node &&
                this.preTargetNode.setElementState(t.ElementState.DEFAULT),
              u.id === d)
            )
              return
            this.preTargetNode = c
            var p = ''
              .concat(s.id, '_')
              .concat(c.id, '_')
              .concat(d, '_')
              .concat(u.id)
            if (!this.targetRuleResults.has(p)) {
              var h = l.anchor,
                f = s.isAllowConnectedAsSource(c, u, h),
                v = c.isAllowConnectedAsTarget(s, u, h)
              this.sourceRuleResults.set(p, nb(f)),
                this.targetRuleResults.set(p, nb(v))
            }
            var y = (
                null !== (r = this.sourceRuleResults.get(p)) && void 0 !== r
                  ? r
                  : {}
              ).isAllPass,
              g = (
                null !== (o = this.targetRuleResults.get(p)) && void 0 !== o
                  ? o
                  : {}
              ).isAllPass
            y && g
              ? c.setElementState(t.ElementState.ALLOW_CONNECT)
              : c.setElementState(t.ElementState.NOT_ALLOW_CONNECT)
          } else
            this.preTargetNode &&
              this.preTargetNode.state !== t.ElementState.DEFAULT &&
              this.preTargetNode.setElementState(t.ElementState.DEFAULT)
        }),
        (n.prototype.isShowLine = function () {
          var t = this.state,
            e = t.startX,
            n = t.startY,
            r = t.endX,
            o = t.endY
          return Hm(e, n, r, o) > 10
        }),
        (n.prototype.render = function () {
          var t = this,
            e = this.state,
            n = e.startX,
            r = e.startY,
            o = e.endX,
            i = e.endY,
            a = this.props,
            s = a.anchorData.edgeAddable,
            u = a.edgeStyle
          return lo('g', {
            className: 'lf-anchor',
            children: [
              lo('g', {
                onMouseDown: function (e) {
                  !1 !== s && t.dragHandler.handleMouseDown(e)
                },
                children: this.getAnchorShape()
              }),
              this.isShowLine() &&
                (this.customTrajectory
                  ? this.customTrajectory(
                      no(
                        {
                          sourcePoint: { x: n, y: r },
                          targetPoint: { x: o, y: i }
                        },
                        u
                      )
                    )
                  : lo(
                      Nb,
                      no({ x1: n, y1: r, x2: o, y2: i }, u, {
                        'pointer-events': 'none'
                      })
                    ))
            ]
          })
        }),
        n
      )
    })(Fn),
    kx = (function (e) {
      function n(n) {
        var r = e.call(this, n) || this
        return (
          (r.style = {}),
          (r.onDragging = function (e) {
            var n,
              o = e.event,
              i = r.props,
              a = i.graphModel,
              s = i.nodeModel,
              u = i.eventCenter,
              l = a.selectNodes,
              c = s.x,
              d = s.y,
              p = o.clientX,
              h = o.clientY,
              f = a.getPointByClient({ x: p, y: h }).canvasOverlayPosition,
              v = f.x,
              y = f.y,
              g = new Pm(v - c, y - d),
              _ =
                (null === (n = r.normal) || void 0 === n
                  ? void 0
                  : n.angle(g)) - r.defaultAngle,
              m = new Rm(-c, -d).rotate(_).translate(c, d).toString()
            ;(s.transform = m), (s.rotate = _)
            var b = Mh(l, function (t) {
              return t.id
            })
            ;-1 === b.indexOf(s.id) && (b = [s.id])
            var x = vy(
              b,
              function (t, e) {
                var n = a.getNodeModelById(e)
                return (
                  (t[e] = null == n ? void 0 : n.getMoveDistance(0, 0, !1)), t
                )
              },
              {}
            )
            b.forEach(function (t) {
              a.getNodeEdges(t).forEach(function (t) {
                if (x[t.sourceNodeId]) {
                  var e = a
                    .getNodeModelById(t.sourceNodeId)
                    .anchors.find(function (e) {
                      return e.id === t.sourceAnchorId
                    })
                  t.updateStartPoint(e)
                }
                if (x[t.targetNodeId]) {
                  e = a
                    .getNodeModelById(t.targetNodeId)
                    .anchors.find(function (e) {
                      return e.id === t.targetAnchorId
                    })
                  t.updateEndPoint(e)
                }
              })
            }),
              u.emit(t.EventType.NODE_ROTATE, {
                e: o,
                model: s,
                data: s.getData()
              })
          }),
          (r.style = n.style),
          (r.stepperDrag = new E_({ onDragging: r.onDragging })),
          r
        )
      }
      return (
        eo(n, e),
        (n.prototype.render = function () {
          var t = this,
            e = this.props.nodeModel,
            n = e.x,
            r = e.y,
            o = n + e.width / 2 + 20,
            i = r - e.height / 2 - 20
          return (
            (this.normal = new Pm(1, 0)),
            (this.defaultAngle = this.normal.angle(new Pm(o - n, i - r))),
            (e.defaultAngle = this.defaultAngle),
            lo('g', {
              className: 'lf-rotate-control',
              children: lo('g', {
                onMouseDown: function (e) {
                  t.stepperDrag.handleMouseDown(e)
                },
                children: lo(Ib, no({}, this.style, { cx: o, cy: i }))
              })
            })
          )
        }),
        n
      )
    })(Fn),
    Bx = {},
    zx = {
      get exports() {
        return Bx
      },
      set exports(t) {
        Bx = t
      }
    }
  !(function (t) {
    !(function () {
      var e = {}.hasOwnProperty
      function n() {
        for (var t = '', e = 0; e < arguments.length; e++) {
          var n = arguments[e]
          n && (t = o(t, r(n)))
        }
        return t
      }
      function r(t) {
        if ('string' == typeof t || 'number' == typeof t) return t
        if ('object' != typeof t) return ''
        if (Array.isArray(t)) return n.apply(null, t)
        if (
          t.toString !== Object.prototype.toString &&
          !t.toString.toString().includes('[native code]')
        )
          return t.toString()
        var r = ''
        for (var i in t) e.call(t, i) && t[i] && (r = o(r, i))
        return r
      }
      function o(t, e) {
        return e ? (t ? t + ' ' + e : t + e) : t
      }
      t.exports ? ((n.default = n), (t.exports = n)) : (window.classNames = n)
    })()
  })(zx)
  var Ux,
    Hx = Bx,
    Xx = (function (e) {
      function n(n) {
        var r = e.call(this) || this
        ;(r.mouseDownHandler = function (t) {
          var e = r.props,
            n = e.draggable,
            o = e.model,
            i = e.graphModel.editConfigModel.nodeTextDraggable
          ;(null != n ? n : i) &&
            (t.stopPropagation(),
            (r.stepperDrag.model = o),
            r.stepperDrag.handleMouseDown(t))
        }),
          (r.onDragging = function (t) {
            var e = t.deltaX,
              n = t.deltaY,
              o = r.props,
              i = o.model,
              a = o.graphModel.transformModel
            if (e || n) {
              var s = ao(a.fixDeltaXY(e, n), 2),
                u = s[0],
                l = s[1]
              i.moveText(u, l)
            }
          }),
          (r.dbClickHandler = function () {
            var e = r.props,
              n = e.editable,
              o = e.graphModel.eventCenter,
              i = e.model
            n && i.setElementState(t.ElementState.TEXT_EDIT),
              o.emit(t.EventType.TEXT_DBCLICK, { data: i.text, model: i })
          })
        var o = n.draggable
        return (
          (r.stepperDrag = new E_({
            onDragging: r.onDragging,
            step: 1,
            eventType: 'TEXT',
            isStopPropagation: o
          })),
          r
        )
      }
      return (
        eo(n, e),
        (n.prototype.getShape = function () {
          var t = this.props,
            e = t.model,
            n = t.graphModel.editConfigModel,
            r = e.text,
            o = r.value,
            i = r.x,
            a = r.y,
            s = r.editable,
            u = r.draggable,
            l = { x: i, y: a, className: '', value: o },
            c = e.getTextStyle(),
            d = n.nodeTextDraggable || u
          return lo(
            Ob,
            no({}, l, c, {
              className: Hx({
                'lf-element-text': s,
                'lf-text-draggable': !s && d,
                'lf-text-disabled': !s && !d
              }),
              model: e
            })
          )
        }),
        (n.prototype.render = function () {
          if (this.props.model.text)
            return lo('g', {
              onMouseDown: this.mouseDownHandler,
              onDblClick: this.dbClickHandler,
              children: this.getShape()
            })
        }),
        n
      )
    })(Fn),
    Gx = (function (t) {
      function e(e) {
        var n = t.call(this, e) || this
        return (
          (n.setHoverOn = function () {
            n.setState({ isHovered: !0 })
          }),
          (n.setHoverOff = function () {
            n.setState({ isHovered: !1 })
          }),
          (n.state = { isHovered: !1 }),
          n
        )
      }
      return (
        eo(e, t),
        (e.prototype.getBackground = function () {
          var t = this.state.isHovered,
            e = this.props.model,
            n = e.text,
            r = e.getTextStyle(),
            o = r.background || {}
          if (
            (t &&
              r.hover &&
              r.hover.background &&
              (o = no(no({}, o), r.hover.background)),
            (null == n ? void 0 : n.value) &&
              'transparent' !== (null == o ? void 0 : o.fill))
          ) {
            var i = r.fontSize,
              a = r.textWidth,
              s = r.lineHeight,
              u = r.overflowMode,
              l = o.wrapPadding,
              c = null == n ? void 0 : n.value.split(/[\r\n]/g),
              d = c.length,
              p = n.x,
              h = n.y,
              f = {}
            if ('autoWrap' === u && a) {
              var v = tb({
                rows: c,
                style: {
                  fontSize: ''.concat(i, 'px'),
                  width: ''.concat(a, 'px'),
                  lineHeight: s,
                  padding: l
                },
                rowsLength: d,
                className: 'lf-get-text-height'
              })
              f = no(no({}, o), { x: p, y: h, width: a, height: v })
            } else {
              var y = Mm({ rows: c, rowsLength: d, fontSize: i }),
                g = y.width,
                _ = y.height
              if (
                ('ellipsis' === u && ((g = a), (_ = i + 2)),
                'string' == typeof o.wrapPadding)
              ) {
                var m = o.wrapPadding
                  .split(',')
                  .filter(function (t) {
                    return t.trim()
                  })
                  .map(function (t) {
                    return parseFloat(t.trim())
                  })
                if (m.length > 0 && m.length <= 4) {
                  if (1 === m.length) {
                    var b = ao(m, 1)[0]
                    m = [b, b, b, b]
                  } else if (2 === m.length) {
                    var x = ao(m, 2),
                      E = x[0]
                    m = [E, (M = x[1]), E, M]
                  } else if (3 === m.length) {
                    var M,
                      T = ao(m, 3)
                    m = [T[0], (M = T[1]), T[2], M]
                  }
                  var S = ao(m, 4),
                    w = S[0],
                    A = S[1],
                    O = S[2],
                    D = S[3]
                  ;(g += A + D),
                    (_ += w + O),
                    (p += (A - D) / 2),
                    (h += (O - w) / 2)
                }
              }
              f = no(no({}, o), { x: p - 1, y: h - 1, width: g, height: _ })
            }
            return lo(Pb, no({}, f))
          }
          return null
        }),
        (e.prototype.getShape = function () {
          var t = this.props.model,
            e = t.text,
            n = e.x,
            r = e.y,
            o = e.value
          if (!o) return null
          var i = t.getTextStyle(),
            a = no(
              { x: n, y: r, value: o, model: t, className: 'lf-element-text' },
              i
            )
          return lo('g', {
            className: 'lf-line-text',
            onMouseEnter: this.setHoverOn,
            onMouseLeave: this.setHoverOff,
            children: [this.getBackground(), lo(Ob, no({}, a))]
          })
        }),
        e
      )
    })(Xx),
    Wx = (function (e) {
      function n(n) {
        var r = e.call(this) || this
        ;(r.onDragStart = function (t) {
          var e = t.event,
            n = r.props,
            o = n.model,
            i = n.graphModel
          if (e) {
            var a = i.getPointByClient({
                x: e.clientX,
                y: e.clientY
              }).canvasOverlayPosition,
              s = a.x,
              u = a.y
            r.moveOffset = { dx: o.x - s, dy: o.y - u }
          }
        }),
          (r.onDragging = function (t) {
            var e,
              n,
              o,
              i,
              a = t.event,
              s = r.props,
              u = s.model,
              l = s.graphModel,
              c = l.editConfigModel,
              d = c.stopMoveGraph,
              p = c.autoExpand,
              h = c.snapGrid,
              f = l.transformModel,
              v = l.selectNodes,
              y = l.width,
              g = l.height,
              _ = l.gridSize
            u.isDragging = !0
            var m = a,
              b = m.clientX,
              x = m.clientY,
              E = l.getPointByClient({ x: b, y: x }).canvasOverlayPosition,
              M = E.x,
              T = E.y,
              S = ao(f.CanvasPointToHtmlPoint([M, T]), 2),
              w = S[0],
              A = S[1]
            if (
              ((M +=
                null !==
                  (n =
                    null === (e = r.moveOffset) || void 0 === e
                      ? void 0
                      : e.dx) && void 0 !== n
                  ? n
                  : 0),
              (T +=
                null !==
                  (i =
                    null === (o = r.moveOffset) || void 0 === o
                      ? void 0
                      : o.dy) && void 0 !== i
                  ? i
                  : 0),
              (M = Tm(M, _, h)),
              (T = Tm(T, _, h)),
              y && g)
            ) {
              if (!p || d || !(w < 0 || A < 0 || w > y || A > g)) {
                var O = ao(
                    f.CanvasPointToHtmlPoint([
                      M - u.width / 2,
                      T - u.height / 2
                    ]),
                    2
                  ),
                  D = O[0],
                  N = O[1],
                  P = ao(
                    f.CanvasPointToHtmlPoint([
                      M + u.width / 2,
                      T + u.height / 2
                    ]),
                    2
                  ),
                  C = P[0],
                  I = P[1],
                  L = Math.max(_, 20),
                  j = []
                D < 0
                  ? (j = [L, 0])
                  : C > l.width
                  ? (j = [-L, 0])
                  : N < 0
                  ? (j = [0, L])
                  : I > l.height && (j = [0, -L]),
                  r.t && Ab(r.t),
                  (u.transform = new Rm(-M, -T)
                    .rotate(u.rotate)
                    .translate(M, T)
                    .toString())
                var R = v.map(function (t) {
                  return t.id
                })
                ;-1 === R.indexOf(u.id) && (R = [u.id]),
                  j.length > 0 && !d && p
                    ? (r.t = wb(function () {
                        var t = ao(j, 2),
                          e = t[0],
                          n = t[1]
                        f.translate(null != e ? e : 0, null != n ? n : 0)
                        var r = -(null != e ? e : 0) / f.SCALE_X,
                          o = -(null != n ? n : 0) / f.SCALE_X
                        l.moveNodes(R, r, o)
                      }))
                    : l.moveNodes(R, M - u.x, T - u.y)
              }
            } else l.moveNode2Coordinate(u.id, M, T)
          }),
          (r.onDragEnd = function () {
            r.t && Ab(r.t), (r.props.model.isDragging = !1)
          }),
          (r.onMouseOut = function (t) {
            p_() && r.setHoverOff(t)
          }),
          (r.handleMouseUp = function () {
            var t = r.props.model
            r.mouseUpDrag = t.isDragging
          }),
          (r.handleClick = function (e) {
            var n = !1 === r.mouseUpDrag
            if (r.startTime) {
              var o = r.props,
                i = o.model,
                a = o.graphModel
              if (n) {
                var s = {
                    data: i.getData(),
                    e: e,
                    position: a.getPointByClient({
                      x: e.clientX,
                      y: e.clientY
                    }),
                    isSelected: !1,
                    isMultiple: !1
                  },
                  u = 2 === e.button,
                  l = 2 === e.detail
                if (!u) {
                  var c = a.editConfigModel,
                    d = Om(e, c)
                  ;(s.isMultiple = d),
                    i.isSelected && !l && d
                      ? ((s.isSelected = !1), i.setSelected(!1))
                      : (a.selectNodeById(i.id, d),
                        (s.isSelected = !0),
                        c.isSilentMode || r.toFront()),
                    l
                      ? (c.nodeTextEdit &&
                          i.text.editable &&
                          c.textMode === t.TextMode.TEXT &&
                          (i.setSelected(!1),
                          a.setElementStateById(
                            i.id,
                            t.ElementState.TEXT_EDIT
                          )),
                        a.eventCenter.emit(t.EventType.NODE_DBCLICK, s))
                      : (a.eventCenter.emit(t.EventType.ELEMENT_CLICK, s),
                        a.eventCenter.emit(t.EventType.NODE_CLICK, s))
                }
              }
            }
          }),
          (r.handleContextMenu = function (e) {
            e.preventDefault()
            var n = r.props,
              o = n.model,
              i = n.graphModel,
              a = i.editConfigModel,
              s = o.getData(),
              u = i.getPointByClient({ x: e.clientX, y: e.clientY })
            i.setElementStateById(
              o.id,
              t.ElementState.SHOW_MENU,
              u.domOverlayPosition
            ),
              o.isSelected || i.selectNodeById(o.id),
              i.eventCenter.emit(t.EventType.NODE_CONTEXTMENU, {
                data: s,
                e: e,
                position: u
              }),
              a.isSilentMode || r.toFront()
          }),
          (r.handleMouseDown = function (t) {
            var e = r.props,
              n = e.model,
              o = e.graphModel
            ;(r.startTime = new Date().getTime()),
              o.editConfigModel.adjustNodePosition &&
                n.draggable &&
                r.stepDrag &&
                r.stepDrag.handleMouseDown(t)
          }),
          (r.handleFocus = function () {
            var e = r.props,
              n = e.model
            e.graphModel.eventCenter.emit(t.EventType.NODE_FOCUS, {
              data: n.getData()
            })
          }),
          (r.handleBlur = function () {
            var e = r.props,
              n = e.model
            e.graphModel.eventCenter.emit(t.EventType.NODE_BLUR, {
              data: n.getData()
            })
          }),
          (r.setHoverOn = function (e) {
            var n = r.props,
              o = n.model,
              i = n.graphModel
            if (!o.isHovered) {
              var a = o.getData()
              o.setHovered(!0),
                i.eventCenter.emit(t.EventType.NODE_MOUSEENTER, {
                  data: a,
                  e: e
                })
            }
          }),
          (r.setHoverOff = function (e) {
            var n = r.props,
              o = n.model,
              i = n.graphModel,
              a = o.getData()
            o.isHovered &&
              (o.setHovered(!1),
              i.eventCenter.emit(t.EventType.NODE_MOUSELEAVE, {
                data: a,
                e: e
              }))
          })
        var o = n.graphModel,
          i = o.gridSize,
          a = o.eventCenter,
          s = n.model
        return (
          (r.stepDrag = new E_({
            onDragStart: r.onDragStart,
            onDragging: r.onDragging,
            onDragEnd: r.onDragEnd,
            step: i,
            eventType: 'NODE',
            isStopPropagation: !1,
            eventCenter: a,
            model: s
          })),
          (r.modelDisposer = ae(
            function () {
              return r.props
            },
            function (t) {
              t && t.model && r.stepDrag.setModel(t.model)
            }
          )),
          r
        )
      }
      return (
        eo(n, e),
        (n.prototype.componentWillUnmount = function () {
          this.modelDisposer && this.modelDisposer(),
            this.render.$mobx && this.render.$mobx.dispose()
        }),
        (n.prototype.componentDidMount = function () {}),
        (n.prototype.componentDidUpdate = function () {}),
        (n.prototype.getAnchorShape = function (t) {
          return null
        }),
        (n.prototype.getAnchors = function () {
          var t = this,
            e = this.props,
            n = e.model,
            r = e.graphModel,
            o = n.isSelected,
            i = n.isHitable,
            a = n.isDragging,
            s = n.isShowAnchor
          return i && (o || s) && !a
            ? Mh(n.anchors, function (e, o) {
                var i = n.getAnchorLineStyle(e),
                  a = n.getAnchorStyle(e)
                return lo(Rx, {
                  anchorData: e,
                  node: t,
                  style: a,
                  edgeStyle: i,
                  anchorIndex: o,
                  nodeModel: n,
                  graphModel: r,
                  setHoverOff: t.setHoverOff
                })
              })
            : []
        }),
        (n.prototype.getRotateControl = function () {
          var t = this.props,
            e = t.model,
            n = t.graphModel,
            r = n.editConfigModel,
            o = r.isSilentMode,
            i = r.allowRotate,
            a = e.isSelected,
            s = e.isHitable,
            u = e.rotatable,
            l = e.isHovered,
            c = i && u,
            d = e.getRotateControlStyle()
          if (!o && s && (a || l) && c)
            return lo(kx, {
              graphModel: n,
              nodeModel: e,
              eventCenter: n.eventCenter,
              style: d
            })
        }),
        (n.prototype.getResizeControl = function () {
          var t = this.props,
            e = t.model,
            n = t.graphModel,
            r = n.editConfigModel,
            o = r.isSilentMode,
            i = r.allowResize,
            a = e.isSelected,
            s = e.isHitable,
            u = e.resizable,
            l = e.isHovered,
            c = i && u,
            d = e.getResizeControlStyle()
          return !o && s && (a || l) && c
            ? lo(Bb, { style: d, model: e, graphModel: n })
            : null
        }),
        (n.prototype.getText = function () {
          var e,
            n = this.props,
            r = n.model,
            o = n.graphModel,
            i = o.editConfigModel
          if (i.nodeTextMode !== t.TextMode.TEXT) return null
          if (r.state === t.ElementState.TEXT_EDIT) return null
          if (r.text) {
            var a = !1
            return (
              i.nodeTextDraggable && r.text.draggable && (a = !0),
              lo(Xx, {
                editable:
                  i.nodeTextEdit &&
                  (null === (e = r.text.editable) || void 0 === e || e),
                model: r,
                graphModel: o,
                draggable: a
              })
            )
          }
          return null
        }),
        (n.prototype.getStateClassName = function () {
          var e = this.props.model,
            n = e.state,
            r = e.isDragging,
            o = e.isSelected,
            i = 'lf-node'
          switch (n) {
            case t.ElementState.ALLOW_CONNECT:
              i += ' lf-node-allow'
              break
            case t.ElementState.NOT_ALLOW_CONNECT:
              i += ' lf-node-not-allow'
              break
            default:
              i += ' lf-node-default'
          }
          return r && (i += ' lf-dragging'), o && (i += ' lf-node-selected'), i
        }),
        (n.prototype.toFront = function () {
          var t = this.props,
            e = t.model,
            n = t.graphModel
          e.autoToFront && n.toFront(e.id)
        }),
        (n.prototype.render = function () {
          var t,
            e = this.props,
            n = e.model,
            r = e.graphModel,
            o = r.editConfigModel,
            i = o.hideAnchors,
            a = o.adjustNodePosition,
            s = o.allowRotate,
            u = o.allowResize,
            l = r.gridSize,
            c = r.transformModel.SCALE_X,
            d = n.isHitable,
            p = n.draggable,
            h = n.transform,
            f = n.getOuterGAttributes(),
            v = f.className,
            y = void 0 === v ? '' : v,
            g = ro(f, ['className']),
            _ = lo('g', {
              className: 'lf-node-content',
              children: [
                lo('g', {
                  transform: h,
                  children: [
                    this.getShape(),
                    this.getText(),
                    s && this.getRotateControl(),
                    u && this.getResizeControl()
                  ]
                }),
                !i && this.getAnchors()
              ]
            })
          return (
            d
              ? (a && p && this.stepDrag.setStep(l * c),
                (t = lo(
                  'g',
                  no(
                    {
                      className: ''
                        .concat(this.getStateClassName(), ' ')
                        .concat(y),
                      onMouseDown: this.handleMouseDown,
                      onMouseUp: this.handleMouseUp,
                      onClick: this.handleClick,
                      onMouseEnter: this.setHoverOn,
                      onMouseOver: this.setHoverOn,
                      onMouseLeave: this.setHoverOff,
                      onMouseOut: this.onMouseOut,
                      onContextMenu: this.handleContextMenu,
                      onFocus: this.handleFocus,
                      onBlur: this.handleBlur
                    },
                    g,
                    { children: _ }
                  )
                )))
              : (t = lo(
                  'g',
                  no(
                    {
                      className: ''
                        .concat(this.getStateClassName(), ' ')
                        .concat(y)
                    },
                    g,
                    { children: _ }
                  )
                )),
            t
          )
        }),
        (n.isObserved = !1),
        n
      )
    })(Fn),
    Yx = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this
      }
      return (
        eo(e, t),
        (e.prototype.getShape = function () {
          var t = this.props.model,
            e = t.getNodeStyle()
          return lo(
            Pb,
            no({}, e, {
              x: t.x,
              y: t.y,
              width: t.width,
              height: t.height,
              radius: t.radius
            })
          )
        }),
        e
      )
    })(Wx),
    Fx = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this
      }
      return (
        eo(e, t),
        (e.prototype.getShape = function () {
          var t = this.props.model,
            e = t.x,
            n = t.y,
            r = t.r,
            o = t.getNodeStyle()
          return lo(Ib, no({}, o, { x: e, y: n, r: r }))
        }),
        e
      )
    })(Wx),
    Vx = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this
      }
      return (
        eo(e, t),
        (e.prototype.getShape = function () {
          var t = this.props.model,
            e = t,
            n = e.x,
            r = e.y,
            o = e.width,
            i = e.height,
            a = e.points,
            s = t.getNodeStyle(),
            u = {
              transform: 'matrix(1 0 0 1 '
                .concat(n - o / 2, ' ')
                .concat(r - i / 2, ')')
            }
          return lo(
            'g',
            no({}, u, {
              children: lo(jb, no({}, s, { points: a, x: n, y: r }))
            })
          )
        }),
        e
      )
    })(Wx),
    Kx = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this
      }
      return (
        eo(e, t),
        (e.prototype.getShape = function () {
          var t = this.props.model,
            e = t.getNodeStyle()
          return lo('g', {
            children: lo(jb, no({}, e, { points: t.points, x: t.x, y: t.y }))
          })
        }),
        e
      )
    })(Wx),
    qx = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this
      }
      return (
        eo(e, t),
        (e.prototype.getShape = function () {
          var t = this.props.model,
            e = t.getNodeStyle()
          return lo(Lb, no({}, e, { x: t.x, y: t.y, rx: t.rx, ry: t.ry }))
        }),
        e
      )
    })(Wx),
    Zx = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this
      }
      return (
        eo(e, t),
        (e.prototype.getBackground = function () {
          var t = this.props.model,
            e = t.getTextStyle(),
            n = t.width,
            r = t.height,
            o = t.x,
            i = t.y,
            a = no(no({}, e.background), { x: o, y: i, width: n, height: r })
          return lo(Pb, no({}, a))
        }),
        (e.prototype.getResizeControl = function () {
          return null
        }),
        (e.prototype.getShape = function () {
          return lo('g', { children: this.getBackground() })
        }),
        e
      )
    })(Wx),
    $x = (function (t) {
      function e() {
        var e = t.apply(this, so([], ao(arguments), !1)) || this
        return (e.ref = { current: null }), e
      }
      return (
        eo(e, t),
        Object.defineProperty(e.prototype, 'rootEl', {
          get: function () {
            return this.ref.current
          },
          enumerable: !1,
          configurable: !0
        }),
        (e.prototype.setHtml = function (t) {
          t.appendChild(document.createElement('div'))
        }),
        (e.prototype.confirmUpdate = function (t) {
          this.setHtml(t)
        }),
        (e.prototype.shouldUpdate = function () {
          return (
            (!this.preProperties ||
              this.preProperties !== this.currentProperties) &&
            ((this.preProperties = this.currentProperties), !0)
          )
        }),
        (e.prototype.componentDidMount = function () {
          this.shouldUpdate() && this.rootEl && this.setHtml(this.rootEl)
        }),
        (e.prototype.componentDidUpdate = function () {
          this.shouldUpdate() && this.rootEl && this.confirmUpdate(this.rootEl)
        }),
        (e.prototype.componentWillUnmount = function () {
          t.prototype.componentWillUnmount.call(this),
            (this.rootEl.innerHTML = '')
        }),
        (e.prototype.getShape = function () {
          var t = this.props.model,
            e = t.x,
            n = t.y,
            r = t.height,
            o = t.width,
            i = t.getNodeStyle()
          return (
            (this.currentProperties = JSON.stringify(t.properties)),
            lo(
              'foreignObject',
              no({}, i, {
                x: e - o / 2,
                y: n - r / 2,
                width: o,
                height: r,
                ref: this.ref
              })
            )
          )
        }),
        e
      )
    })(Wx)
  ;(t.AdjustType = void 0),
    ((Ux = t.AdjustType || (t.AdjustType = {})).SOURCE = 'SOURCE'),
    (Ux.TARGET = 'TARGET')
  var Jx = (function (e) {
      function n(n) {
        var r = e.call(this) || this
        ;(r.handleMouseDown = function (t) {
          r.stepDrag && r.stepDrag.handleMouseDown(t)
        }),
          (r.onDragStart = function () {
            var t = r.props,
              e = t.x,
              n = t.y,
              o = t.edgeModel,
              i = o.startPoint,
              a = o.endPoint,
              s = o.pointsList
            ;(r.oldEdge = { startPoint: i, endPoint: a, pointsList: s }),
              r.setState({ endX: e, endY: n, dragging: !0 })
          }),
          (r.onDragging = function (e) {
            var n = e.deltaX,
              o = e.deltaY,
              i = r.state,
              a = i.endX,
              s = i.endY,
              u = r.props,
              l = u.graphModel,
              c = u.type,
              d = l.transformModel,
              p = l.editConfigModel,
              h = ao(d.moveCanvasPointByHtml([a, s], n, o), 2),
              f = h[0],
              v = h[1]
            r.setState({ endX: f, endY: v, dragging: !0 })
            var y = r.props.edgeModel,
              g = Bm({ x: a, y: s }, l)
            if (g && g.node && r.isAllowAdjust(g).pass) {
              var _ = y.startPoint,
                m = y.endPoint,
                b = y.sourceNode,
                x = y.targetNode,
                E =
                  c === t.AdjustType.SOURCE
                    ? {
                        startPoint: { x: g.anchor.x, y: g.anchor.y },
                        endPoint: { x: m.x, y: m.y },
                        sourceNode: g.node,
                        targetNode: x
                      }
                    : {
                        startPoint: { x: _.x, y: _.y },
                        endPoint: { x: g.anchor.x, y: g.anchor.y },
                        sourceNode: b,
                        targetNode: g.node
                      }
              y.updateAfterAdjustStartAndEnd(E)
            } else
              c === t.AdjustType.SOURCE
                ? y.updateStartPoint({ x: f, y: v })
                : y.updateEndPoint({ x: f, y: v })
            y.text.value &&
              p.adjustEdge &&
              y.setText(Object.assign({}, y.text, y.textPosition))
          }),
          (r.onDragEnd = function (e) {
            var n,
              o,
              i,
              a = e.event
            try {
              r.setState({ dragging: !1 })
              var s = r.props,
                u = s.graphModel,
                l = s.edgeModel,
                c = s.type,
                d = r.state,
                p = d.endX,
                h = d.endY,
                f = d.dragging,
                v = Bm({ x: p, y: h }, u)
              if (!f) return
              var y = !1,
                g = void 0
              if (v && v.node) {
                var _ = r.isAllowAdjust(v),
                  m = _.pass,
                  b = _.msg,
                  x = _.newTargetNode
                if (m) {
                  var E = l.getData(),
                    M = E.text,
                    T = E.sourceAnchorId,
                    S = void 0 === T ? '' : T,
                    w = E.targetAnchorId,
                    A = void 0 === w ? '' : w,
                    O = ro(E, ['text', 'sourceAnchorId', 'targetAnchorId'])
                  if (
                    ((g = no(no({ sourceAnchorId: S, targetAnchorId: A }, O), {
                      text: (null == M ? void 0 : M.value) || ''
                    })),
                    c === t.AdjustType.SOURCE)
                  ) {
                    var D = u.getNodeModelById(v.node.id),
                      N = u.getNodeModelById(l.targetNodeId),
                      P =
                        null === (n = u.edgeGenerator) || void 0 === n
                          ? void 0
                          : n.call(
                              u,
                              null == D ? void 0 : D.getData(),
                              null == N ? void 0 : N.getData(),
                              g
                            )
                    ;(g = no(no({}, P), {
                      sourceNodeId: v.node.id,
                      sourceAnchorId: v.anchor.id,
                      startPoint: { x: v.anchor.x, y: v.anchor.y },
                      targetNodeId: l.targetNodeId,
                      endPoint: no({}, l.endPoint)
                    })),
                      l.sourceNodeId === v.node.id &&
                        l.sourceAnchorId === v.anchor.id &&
                        (y = !0)
                  } else if (c === t.AdjustType.TARGET) {
                    ;(D = u.getNodeModelById(l.sourceNodeId)),
                      (N = u.getNodeModelById(v.node.id)),
                      (P =
                        null === (o = u.edgeGenerator) || void 0 === o
                          ? void 0
                          : o.call(
                              u,
                              null == D ? void 0 : D.getData(),
                              null == N ? void 0 : N.getData(),
                              g
                            ))
                    ;(g = no(no({}, P), {
                      sourceNodeId: l.sourceNodeId,
                      startPoint: no({}, l.startPoint),
                      targetNodeId: v.node.id,
                      targetAnchorId: v.anchor.id,
                      endPoint: { x: v.anchor.x, y: v.anchor.y }
                    })),
                      l.targetNodeId === v.node.id &&
                        l.targetAnchorId === v.anchor.id &&
                        (y = !0)
                  }
                } else {
                  y = !0
                  var C = x.getData()
                  u.eventCenter.emit(t.EventType.CONNECTION_NOT_ALLOWED, {
                    data: C,
                    msg: b
                  })
                }
              } else y = !0
              if (y) r.recoveryEdge()
              else {
                var I = l.getData()
                u.deleteEdgeById(l.id)
                var L = u.addEdge(no({}, g))
                u.eventCenter.emit(t.EventType.EDGE_EXCHANGE_NODE, {
                  data: { newEdge: L.getData(), oldEdge: I }
                })
              }
              null === (i = r.preTargetNode) ||
                void 0 === i ||
                i.setElementState(t.ElementState.DEFAULT)
            } finally {
              ;(u = r.props.graphModel).eventCenter.emit(
                t.EventType.ADJUST_POINT_DRAGEND,
                { e: a, data: r.stepDragData }
              )
            }
          }),
          (r.recoveryEdge = function () {
            var e = r.props.edgeModel,
              n = r.oldEdge,
              o = n.startPoint,
              i = n.endPoint,
              a = n.pointsList
            e.updateStartPoint(o),
              e.updateEndPoint(i),
              e.modelType !== t.ModelType.LINE_EDGE &&
                ((e.pointsList = null != a ? a : []), e.initPoints())
          }),
          (r.getAdjustPointStyle = function () {
            return r.props.graphModel.theme.edgeAdjust
          }),
          (r.state = { dragging: !1, endX: 0, endY: 0 }),
          (r.targetRuleResults = new Map()),
          (r.sourceRuleResults = new Map())
        var o = n.type,
          i = n.edgeModel,
          a = n.graphModel.eventCenter
        return (
          (r.stepDragData = { type: o, edgeData: i.getData() }),
          (r.stepDrag = new E_({
            onDragStart: r.onDragStart,
            onDragging: r.onDragging,
            onDragEnd: r.onDragEnd,
            eventType: 'ADJUST_POINT',
            isStopPropagation: !1,
            eventCenter: a,
            data: r.stepDragData
          })),
          r
        )
      }
      return (
        eo(n, e),
        (n.prototype.isAllowAdjust = function (e) {
          var n,
            r,
            o,
            i,
            a = this.props,
            s = a.edgeModel,
            u = s.id,
            l = s.sourceNode,
            c = s.targetNode,
            d = s.sourceAnchorId,
            p = s.targetAnchorId,
            h = a.type
          if (
            (h === t.AdjustType.SOURCE
              ? ((n = e.node),
                (r = c),
                (o = e.anchor),
                (i = c.getAnchorInfo(p)))
              : ((n = l),
                (r = e.node),
                (i = e.anchor),
                (o = l.getAnchorInfo(d))),
            this.preTargetNode &&
              this.preTargetNode !== e.node &&
              this.preTargetNode.setElementState(t.ElementState.DEFAULT),
            (this.preTargetNode = e.node),
            i.id === o.id)
          )
            return { pass: !1, msg: '', newTargetNode: r }
          var f = ''
            .concat(n.id, '_')
            .concat(r.id, '_')
            .concat(o.id, '_')
            .concat(i.id)
          if (!this.targetRuleResults.has(f)) {
            var v = n.isAllowConnectedAsSource(r, o, i, u),
              y = r.isAllowConnectedAsTarget(n, o, i, u)
            this.sourceRuleResults.set(f, nb(v)),
              this.targetRuleResults.set(f, nb(y))
          }
          var g = this.sourceRuleResults.get(f),
            _ = g.isAllPass,
            m = g.msg,
            b = this.targetRuleResults.get(f),
            x = b.isAllPass,
            E = b.msg,
            M =
              _ && x
                ? t.ElementState.ALLOW_CONNECT
                : t.ElementState.NOT_ALLOW_CONNECT
          return (
            h === t.AdjustType.SOURCE
              ? n.setElementState(M)
              : r.setElementState(M),
            { pass: _ && x, msg: E || m, newTargetNode: r }
          )
        }),
        (n.prototype.render = function () {
          var t = this.props,
            e = t.x,
            n = t.y,
            r = t.getAdjustPointShape,
            o = t.edgeModel,
            i = this.state.dragging
          return lo('g', {
            pointerEvents: i ? 'none' : '',
            onMouseDown: this.handleMouseDown,
            children: i ? '' : r(e, n, o)
          })
        }),
        n
      )
    })(Fn),
    Qx = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this
      }
      return (
        eo(e, t),
        (e.prototype.getArrowAttributes = function () {
          var t = this.props,
            e = t.arrowInfo,
            n = t.style,
            r = e.start,
            o = e.end,
            i = {
              start: r,
              end: o,
              offset: n.offset,
              verticalLength: n.verticalLength,
              type: 'end'
            },
            a = N_(i),
            s = a.leftX,
            u = a.leftY,
            l = a.rightX,
            c = a.rightY
          return no(
            {
              d: 'M'
                .concat(s, ' ')
                .concat(u, ' L')
                .concat(o.x, ' ')
                .concat(o.y, ' L')
                .concat(l, ' ')
                .concat(c, ' z')
            },
            n
          )
        }),
        (e.prototype.getShape = function () {
          var t = this.getArrowAttributes(),
            e = t.d,
            n = t.strokeWidth,
            r = t.stroke
          return lo(Cb, { d: e, fill: t.fill, strokeWidth: n, stroke: r })
        }),
        (e.prototype.render = function () {
          return lo('g', { className: 'lf-arrow', children: this.getShape() })
        }),
        e
      )
    })(Fn),
    tE = (function (e) {
      function n() {
        var n = e.call(this) || this
        return (
          (n.textRef = { current: null }),
          (n.handleHover = function (e, r) {
            var o = n.props,
              i = o.model,
              a = o.graphModel.eventCenter
            i.setHovered(e)
            var s = e
                ? t.EventType.EDGE_MOUSEENTER
                : t.EventType.EDGE_MOUSELEAVE,
              u = i.getData()
            a.emit(s, { data: u, e: r })
          }),
          (n.setHoverOn = function (t) {
            n.props.model.isHovered ||
              (n.textRef && n.textRef.current && n.textRef.current.setHoverOn(),
              n.handleHover(!0, t))
          }),
          (n.setHoverOff = function (t) {
            n.props.model.isHovered &&
              (n.textRef &&
                n.textRef.current &&
                n.textRef.current.setHoverOff(),
              n.handleHover(!1, t))
          }),
          (n.handleContextMenu = function (e) {
            e.preventDefault(),
              (n.contextMenuTime = new Date().getTime()),
              n.clickTimer && clearTimeout(n.clickTimer)
            var r = n.props,
              o = r.model,
              i = r.graphModel,
              a = i.editConfigModel,
              s = i.getPointByClient({ x: e.clientX, y: e.clientY })
            i.setElementStateById(
              o.id,
              t.ElementState.SHOW_MENU,
              s.domOverlayPosition
            ),
              a.isSilentMode || n.toFront(),
              o.isSelected || i.selectEdgeById(o.id)
            var u = null == o ? void 0 : o.getData()
            i.eventCenter.emit(t.EventType.EDGE_CONTEXTMENU, {
              data: u,
              e: e,
              position: s
            })
          }),
          (n.handleMouseDown = function (t) {
            t.stopPropagation(), (n.startTime = new Date().getTime())
          }),
          (n.handleMouseUp = function () {
            var t = n.props.model
            n.mouseUpDrag = t.isDragging
          }),
          (n.handleClick = function (e) {
            if (n.startTime && !(n.mouseUpDrag || 2 === e.button)) {
              var r = 2 === e.detail,
                o = n.props,
                i = o.model,
                a = o.graphModel,
                s = null == i ? void 0 : i.getData(),
                u = a.getPointByClient({ x: e.clientX, y: e.clientY })
              if (r) {
                var l = a.editConfigModel,
                  c = a.textEditElement,
                  d = i.id,
                  p = i.text,
                  h = i.modelType
                if (
                  (c &&
                    c.id === d &&
                    a.setElementStateById(d, t.ElementState.DEFAULT),
                  l.edgeTextEdit &&
                    p.editable &&
                    (i.setSelected(!1),
                    a.setElementStateById(d, t.ElementState.TEXT_EDIT)),
                  h === t.ModelType.POLYLINE_EDGE)
                ) {
                  var f = i,
                    v = a.getPointByClient({
                      x: e.x,
                      y: e.y
                    }).canvasOverlayPosition,
                    y = v.x,
                    g = v.y
                  f.dbClickPosition = mm({ x: y, y: g }, f.points)
                }
                a.eventCenter.emit(t.EventType.EDGE_DBCLICK, {
                  data: s,
                  e: e,
                  position: u
                })
              } else
                a.eventCenter.emit(t.EventType.ELEMENT_CLICK, {
                  data: s,
                  e: e,
                  position: u
                }),
                  a.eventCenter.emit(t.EventType.EDGE_CLICK, {
                    data: s,
                    e: e,
                    position: u
                  })
              var _ = a.editConfigModel
              a.selectEdgeById(i.id, Om(e, _)), _.isSilentMode || n.toFront()
            }
          }),
          (n.handleFocus = function () {
            var e = n.props,
              r = e.model
            e.graphModel.eventCenter.emit(t.EventType.EDGE_FOCUS, {
              data: r.getData()
            })
          }),
          (n.handleBlur = function () {
            var e = n.props,
              r = e.model
            e.graphModel.eventCenter.emit(t.EventType.EDGE_BLUR, {
              data: r.getData()
            })
          }),
          n
        )
      }
      return (
        eo(n, e),
        (n.prototype.getShape = function () {
          return lo('g', { children: this.getEdge() })
        }),
        (n.prototype.getTextStyle = function () {}),
        (n.prototype.getText = function () {
          var e,
            n = this.props,
            r = n.model,
            o = n.graphModel,
            i = o.editConfigModel
          if (i.edgeTextMode !== t.TextMode.TEXT) return null
          if (r.state === t.ElementState.TEXT_EDIT) return null
          if (r.text) {
            var a = !1
            return (
              i.edgeTextDraggable && r.text.draggable && (a = !0),
              lo(Gx, {
                ref: this.textRef,
                editable:
                  i.edgeTextEdit &&
                  (null === (e = r.text.editable) || void 0 === e || e),
                model: r,
                graphModel: o,
                draggable: a
              })
            )
          }
          return null
        }),
        (n.prototype.getArrowInfo = function () {
          var t = this.props.model,
            e = t.startPoint,
            n = t.endPoint,
            r = t.isSelected
          return { start: e, end: n, hover: this.state.hover, isSelected: r }
        }),
        (n.prototype.getLastTwoPoints = function () {
          var t = this.props.model
          return [t.startPoint, t.endPoint]
        }),
        (n.prototype.getArrowStyle = function () {
          return null
        }),
        (n.prototype.getArrow = function () {
          var t = this.props.model,
            e = t.id,
            n = t.getArrowStyle(),
            r = n.refY,
            o = void 0 === r ? 0 : r,
            i = n.refX,
            a = void 0 === i ? 2 : i,
            s = ao(this.getLastTwoPoints(), 2),
            u = s[0],
            l = s[1],
            c = 'auto'
          return (
            null !== u &&
              null !== l &&
              (c = $b(Zb({ x: l.x - u.x, y: l.y - u.y, z: 0 }))),
            lo('g', {
              children: lo('defs', {
                children: [
                  lo('marker', {
                    id: 'marker-start-'.concat(e),
                    refX: -a,
                    refY: o,
                    overflow: 'visible',
                    orient: 'auto',
                    markerUnits: 'userSpaceOnUse',
                    children: this.getStartArrow()
                  }),
                  lo('marker', {
                    id: 'marker-end-'.concat(e),
                    refX: a,
                    refY: o,
                    overflow: 'visible',
                    orient: c,
                    markerUnits: 'userSpaceOnUse',
                    children: this.getEndArrow()
                  })
                ]
              })
            })
          )
        }),
        (n.prototype.getStartArrow = function () {
          return lo('path', {})
        }),
        (n.prototype.getEndArrow = function () {
          var t = this.props.model.getArrowStyle(),
            e = t.stroke,
            n = t.strokeWidth,
            r = t.offset,
            o = t.verticalLength
          return lo('path', {
            stroke: e,
            fill: e,
            strokeWidth: n,
            transform: 'rotate(180)',
            d: 'M 0 0 L '
              .concat(r, ' -')
              .concat(o, ' L ')
              .concat(r, ' ')
              .concat(o, ' Z')
          })
        }),
        (n.prototype.getAdjustPointShape = function (t, e, n) {
          var r = n.getAdjustPointStyle()
          return lo(
            Ib,
            no({ className: 'lf-edge-adjust-point' }, r, { x: t, y: e })
          )
        }),
        (n.prototype.getAdjustPoints = function () {
          var e = this.props,
            n = e.model,
            r = e.graphModel,
            o = r.editConfigModel,
            i = o.adjustEdgeStartAndEnd,
            a = o.adjustEdgeStart,
            s = o.adjustEdgeEnd,
            u = n.getAdjustStart(),
            l = n.getAdjustEnd()
          return lo('g', {
            children: [
              i &&
                a &&
                lo(
                  Jx,
                  no({ type: t.AdjustType.SOURCE }, u, {
                    getAdjustPointShape: this.getAdjustPointShape,
                    edgeModel: n,
                    graphModel: r
                  })
                ),
              i &&
                s &&
                lo(
                  Jx,
                  no({ type: t.AdjustType.TARGET }, l, {
                    getAdjustPointShape: this.getAdjustPointShape,
                    edgeModel: n,
                    graphModel: r
                  })
                )
            ]
          })
        }),
        (n.prototype.getAnimation = function () {}),
        (n.prototype.getAppendWidth = function () {
          return lo('g', {})
        }),
        (n.prototype.getAppend = function () {
          return lo('g', {
            className: 'lf-edge-append',
            children: this.getAppendWidth()
          })
        }),
        (n.prototype.getEdge = function () {
          return null
        }),
        (n.prototype.toFront = function () {
          var t = this.props,
            e = t.graphModel,
            n = t.model
          e.toFront(n.id)
        }),
        (n.prototype.render = function () {
          var t = this.props.model,
            e = t.isSelected,
            n = t.isHitable,
            r = t.isShowAdjustPoint
          return lo('g', {
            children: [
              lo('g', {
                className: [
                  'lf-edge',
                  !n && 'pointer-none',
                  e && 'lf-edge-selected'
                ]
                  .filter(Boolean)
                  .join(' '),
                onMouseDown: this.handleMouseDown,
                onMouseUp: this.handleMouseUp,
                onClick: this.handleClick,
                onContextMenu: this.handleContextMenu,
                onMouseOver: this.setHoverOn,
                onMouseEnter: this.setHoverOn,
                onMouseLeave: this.setHoverOff,
                onFocus: this.handleFocus,
                onBlur: this.handleBlur,
                children: [
                  this.getShape(),
                  this.getAppend(),
                  this.getText(),
                  this.getArrow()
                ]
              }),
              r && e ? this.getAdjustPoints() : ''
            ]
          })
        }),
        (n.isObserved = !1),
        n
      )
    })(Fn),
    eE = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this
      }
      return (
        eo(e, t),
        (e.prototype.getEdge = function () {
          var t = this.props.model,
            e = t.getEdgeStyle(),
            n = t,
            r = n.path,
            o = n.isAnimation,
            i = n.arrowConfig,
            a = t.getEdgeAnimationStyle(),
            s = a.strokeDasharray,
            u = a.stroke,
            l = a.strokeDashoffset,
            c = a.animationName,
            d = a.animationDuration,
            p = a.animationIterationCount,
            h = a.animationTimingFunction,
            f = a.animationDirection
          return lo(
            Cb,
            no(
              { d: r },
              e,
              i,
              o
                ? {
                    strokeDasharray: s,
                    stroke: u,
                    style: {
                      strokeDashoffset: l,
                      animationName: c,
                      animationDuration: d,
                      animationIterationCount: p,
                      animationTimingFunction: h,
                      animationDirection: f
                    }
                  }
                : {}
            )
          )
        }),
        (e.prototype.getAppendWidth = function () {
          return lo(Cb, {
            d: this.props.model.path,
            strokeWidth: 10,
            stroke: 'transparent',
            fill: 'none'
          })
        }),
        (e.prototype.getArrowInfo = function () {
          var t = this.props.model,
            e = this.state.hover,
            n = t.isSelected,
            r = t.getArrowStyle().offset,
            o = t.pointsList.map(function (t) {
              return { x: t.x, y: t.y }
            }),
            i = ao(_m(o, r), 2)
          return { start: i[0], end: i[1], hover: e, isSelected: n }
        }),
        (e.prototype.getLastTwoPoints = function () {
          var t = this.props.model,
            e = t.getArrowStyle().offset,
            n = t.pointsList.map(function (t) {
              return { x: t.x, y: t.y }
            })
          return _m(n, e)
        }),
        e
      )
    })(tE),
    nE = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this
      }
      return (
        eo(e, t),
        (e.prototype.getEdge = function () {
          var t = this.props.model,
            e = t.startPoint,
            n = t.endPoint,
            r = t.isAnimation,
            o = t.arrowConfig,
            i = t.getEdgeStyle(),
            a = t.getEdgeAnimationStyle(),
            s = a.strokeDasharray,
            u = a.stroke,
            l = a.strokeDashoffset,
            c = a.animationName,
            d = a.animationDuration,
            p = a.animationIterationCount,
            h = a.animationTimingFunction,
            f = a.animationDirection
          return lo(
            Nb,
            no(
              {},
              i,
              { x1: e.x, y1: e.y, x2: n.x, y2: n.y },
              o,
              r
                ? {
                    strokeDasharray: s,
                    stroke: u,
                    style: {
                      strokeDashoffset: l,
                      animationName: c,
                      animationDuration: d,
                      animationIterationCount: p,
                      animationTimingFunction: h,
                      animationDirection: f
                    }
                  }
                : {}
            )
          )
        }),
        (e.prototype.getAppendWidth = function () {
          var t = this.props.model,
            e = t.startPoint,
            n = t.endPoint,
            r = fm({ start: e, end: n }),
            o = r.d,
            i = r.strokeWidth,
            a = r.fill,
            s = r.strokeDasharray
          return lo(Cb, {
            d: o,
            fill: a,
            strokeWidth: i,
            stroke: r.stroke,
            strokeDasharray: s
          })
        }),
        e
      )
    })(tE),
    rE = (function (e) {
      function n() {
        var n = e.call(this) || this
        return (
          (n.onDragStart = function () {
            var t = n.props.model
            t.dragAppendStart(),
              (n.isShowAdjustPointTemp = t.isShowAdjustPoint),
              (t.isShowAdjustPoint = !1)
          }),
          (n.onDragging = function (t) {
            var e = t.deltaX,
              r = t.deltaY,
              o = n.props,
              i = o.model,
              a = o.graphModel
            n.isDragging = !0
            var s = a.transformModel,
              u = a.editConfigModel,
              l = ao(s.fixDeltaXY(e, r), 2),
              c = l[0],
              d = l[1],
              p = i,
              h = u.adjustEdgeMiddle
            n.appendInfo = h
              ? p.dragAppendSimple(n.appendInfo, { x: c, y: d })
              : p.dragAppend(n.appendInfo, { x: c, y: d })
          }),
          (n.onDragEnd = function () {
            var e,
              r = n.props,
              o = r.model,
              i = r.graphModel.eventCenter,
              a = o
            a.dragAppendEnd(),
              (n.isDragging = !1),
              (a.isShowAdjustPoint =
                null !== (e = n.isShowAdjustPointTemp) && void 0 !== e && e),
              (n.appendInfo = void 0),
              i.emit(t.EventType.EDGE_ADJUST, { data: a.getData() })
          }),
          (n.beforeDragStart = function (t, e) {
            e.draggable && n.drag.handleMouseDown(t), (n.appendInfo = e)
          }),
          (n.drag = new E_({
            onDragStart: n.onDragStart,
            onDragging: n.onDragging,
            onDragEnd: n.onDragEnd,
            isStopPropagation: !1
          })),
          n
        )
      }
      return (
        eo(n, e),
        (n.prototype.getEdge = function () {
          var t = this.props.model,
            e = t.points,
            n = t.isAnimation,
            r = t.arrowConfig,
            o = t.getEdgeStyle(),
            i = t.getEdgeAnimationStyle(),
            a = i.strokeDasharray,
            s = i.stroke,
            u = i.strokeDashoffset,
            l = i.animationName,
            c = i.animationDuration,
            d = i.animationIterationCount,
            p = i.animationTimingFunction,
            h = i.animationDirection
          return lo(
            Rb,
            no(
              { points: e },
              o,
              r,
              n
                ? {
                    strokeDasharray: a,
                    stroke: s,
                    style: {
                      strokeDashoffset: u,
                      animationName: l,
                      animationDuration: c,
                      animationIterationCount: d,
                      animationTimingFunction: p,
                      animationDirection: h
                    }
                  }
                : {}
            )
          )
        }),
        (n.prototype.getArrowInfo = function () {
          var t = this.props.model,
            e = t.points,
            n = t.isSelected,
            r = this.state.hover,
            o = um(e),
            i = o[0],
            a = o[0]
          return (
            o.length >= 2 && ((i = o[o.length - 2]), (a = o[o.length - 1])),
            { start: i, end: a, hover: r, isSelected: n }
          )
        }),
        (n.prototype.getLastTwoPoints = function () {
          var t = this.props.model.points,
            e = um(t),
            n = e[0],
            r = e[0]
          return (
            e.length >= 2 && ((n = e[e.length - 2]), (r = e[e.length - 1])),
            [n, r]
          )
        }),
        (n.prototype.getAppendAttributes = function (t) {
          var e,
            n = t.start,
            r = t.end
          if (n.x === r.x && n.y === r.y) e = ''
          else {
            var o = { start: n, end: r, offset: 10, verticalLength: 5 },
              i = N_(no(no({}, o), { type: 'start' })),
              a = N_(no(no({}, o), { type: 'end' }))
            e = 'M'
              .concat(i.leftX, ' ')
              .concat(i.leftY, '\n      L')
              .concat(i.rightX, ' ')
              .concat(i.rightY, '\n      L')
              .concat(a.rightX, ' ')
              .concat(a.rightY, '\n      L')
              .concat(a.leftX, ' ')
              .concat(a.leftY, ' z')
          }
          return {
            d: e,
            fill: 'transparent',
            stroke: 'transparent',
            strokeWidth: 1,
            strokeDasharray: '4, 4'
          }
        }),
        (n.prototype.getAppendShape = function (t) {
          var e = this.getAppendAttributes(t),
            n = e.d,
            r = e.strokeWidth,
            o = e.fill,
            i = e.strokeDasharray
          return lo(Cb, {
            d: n,
            fill: o,
            strokeWidth: r,
            stroke: e.stroke,
            strokeDasharray: i
          })
        }),
        (n.prototype.getAppendWidth = function () {
          for (
            var e = this,
              n = this.props,
              r = n.model,
              o = n.graphModel,
              i = r.pointsList,
              a = r.draggable,
              s = [],
              u = i.length,
              l = function (n) {
                var r = 'lf-polyline-append',
                  l = {
                    start: { x: i[n].x, y: i[n].y },
                    end: { x: i[n + 1].x, y: i[n + 1].y },
                    startIndex: n,
                    endIndex: n + 1,
                    direction: t.SegmentDirection.HORIZONTAL,
                    draggable: !0
                  },
                  d = lo('g', { className: r, children: c.getAppendShape(l) }),
                  p = o.editConfigModel,
                  h = p.adjustEdge,
                  f = p.adjustEdgeMiddle
                if (h && a) {
                  var v = l.startIndex,
                    y = l.endIndex,
                    g = f && (0 === v || y === u - 1)
                  ;(l.draggable = !g),
                    l.start.x === l.end.x
                      ? (l.draggable && (r += '-ew-resize'),
                        (l.direction = t.SegmentDirection.VERTICAL))
                      : l.start.y === l.end.y &&
                        (l.draggable && (r += '-ns-resize'),
                        (l.direction = t.SegmentDirection.HORIZONTAL)),
                    (d = lo('g', {
                      className: c.isDragging ? 'lf-dragging' : 'lf-drag-able',
                      onMouseDown: function (t) {
                        return e.beforeDragStart(t, l)
                      },
                      children: lo('g', {
                        className: r,
                        children: c.getAppendShape(l)
                      })
                    }))
                }
                s.push(d)
              },
              c = this,
              d = 0;
            d < u - 1;
            d++
          )
            l(d)
          return lo('g', { children: s })
        }),
        n
      )
    })(tE),
    oE = (function () {
      function e(e) {
        var n = this
        ;(this.nodeConfig = null),
          (this.fakeNode = null),
          (this.stopDrag = function () {
            ;(n.nodeConfig = null),
              window.document.removeEventListener('mouseup', n.stopDrag)
          }),
          (this.dragEnter = function (t) {
            n.nodeConfig &&
              !n.fakeNode &&
              (n.fakeNode = n.lf.createFakeNode(
                no(
                  no({}, n.nodeConfig),
                  n.clientToLocalPoint({ x: t.clientX, y: t.clientY })
                )
              ))
          }),
          (this.onDragOver = function (e) {
            if ((e.preventDefault(), n.fakeNode)) {
              var r = n.clientToLocalPoint({ x: e.clientX, y: e.clientY }),
                o = r.x,
                i = r.y
              n.fakeNode.moveTo(o, i)
              var a = n.fakeNode.getData()
              n.lf.setNodeSnapLine(a),
                n.lf.graphModel.eventCenter.emit(t.EventType.NODE_DND_DRAG, {
                  data: a,
                  e: e
                })
            }
            return !1
          }),
          (this.onDragLeave = function () {
            n.fakeNode &&
              (n.lf.removeNodeSnapLine(),
              n.lf.graphModel.removeFakeNode(),
              (n.fakeNode = null))
          }),
          (this.onDrop = function (e) {
            n.lf.graphModel &&
              e &&
              n.nodeConfig &&
              (n.lf.addNode(
                no(
                  no({}, n.nodeConfig),
                  n.clientToLocalPoint({ x: e.clientX, y: e.clientY })
                ),
                t.EventType.NODE_DND_ADD,
                e
              ),
              e.preventDefault(),
              e.stopPropagation(),
              (n.nodeConfig = null),
              n.lf.removeNodeSnapLine(),
              n.lf.graphModel.removeFakeNode(),
              (n.fakeNode = null))
          })
        var r = e.lf
        this.lf = r
      }
      return (
        (e.prototype.clientToLocalPoint = function (t) {
          var e = t.x,
            n = t.y,
            r = du(this.lf.options, ['grid', 'size']),
            o = this.lf.graphModel.getPointByClient({
              x: e,
              y: n
            }).canvasOverlayPosition,
            i = o.x,
            a = o.y,
            s = this.lf.graphModel.editConfigModel.snapGrid
          return { x: Tm(i, r, s), y: Tm(a, r, s) }
        }),
        (e.prototype.startDrag = function (t) {
          var e = this.lf.graphModel.editConfigModel
          ;(null == e ? void 0 : e.isSilentMode) ||
            ((this.nodeConfig = t),
            window.document.addEventListener('mouseup', this.stopDrag))
        }),
        (e.prototype.eventMap = function () {
          return {
            onMouseEnter: this.dragEnter,
            onMouseOver: this.dragEnter,
            onMouseMove: this.onDragOver,
            onMouseLeave: this.onDragLeave,
            onMouseUp: this.onDrop
          }
        }),
        e
      )
    })()
  var iE = (function (e) {
      function n(n) {
        var r = e.call(this, n) || this
        return (
          (r.ref = { current: null }),
          (r.__prevText = { type: '', text: '', id: '' }),
          (r.keyupHandler = function (e) {
            var n = r.props.graphModel.textEditElement
            'Enter' === e.key &&
              e.altKey &&
              (null == n || n.setElementState(t.ElementState.DEFAULT))
          }),
          (r.inputHandler = function (t) {
            var e = t.target.innerText,
              n = r.props.graphModel.textEditElement
            n &&
              (r.__prevText = {
                type: n.type,
                text: e.replace(/(\r\n)+$|(\n)+$/, ''),
                id: n.id
              })
          }),
          (r.keydownHandler = function (t) {
            t.stopPropagation()
          }),
          (r.state = { style: { left: 0, top: 0 } }),
          r
        )
      }
      return (
        eo(n, e),
        (n.getDerivedStateFromProps = function (e) {
          var n,
            r,
            o = e.textEditElement,
            i = e.graphModel,
            a = i.transformModel,
            s = i.theme,
            u = s.inputText
          if (o) {
            if (
              !(null === (n = o.text) || void 0 === n ? void 0 : n.value) &&
              o.BaseType === t.ElementType.EDGE
            ) {
              var l = o.text,
                c = o.textPosition,
                d = c.x,
                p = c.y
              ;(l.x = d), (l.y = p), o.setText(l)
            }
            var h = {
              resize: 'auto',
              whiteSpace: 'normal',
              wordBreak: 'break-all'
            }
            if (o.BaseType === t.ElementType.EDGE) {
              var f = s.edgeText,
                v = f.overflowMode,
                y = f.lineHeight,
                g = f.wrapPadding
              ;(m = f.textWidth) &&
                'autoWrap' === v &&
                (r = no(no({}, h), {
                  width: m,
                  minWidth: m,
                  lineHeight: y,
                  padding: g
                }))
            } else if (o.BaseType === t.ElementType.NODE) {
              var _ = s.nodeText,
                m =
                  ((v = _.overflowMode),
                  (y = _.lineHeight),
                  (g = _.wrapPadding),
                  _.textWidth),
                b = o.width,
                x = o.modelType,
                E = o.textWidth || m || b
              ;((x !== t.ModelType.TEXT_NODE && 'autoWrap' === v) ||
                (x === t.ModelType.TEXT_NODE && m)) &&
                (r = no(no({}, h), {
                  width: E,
                  minWidth: E,
                  lineHeight: y,
                  padding: g
                }))
            }
            var M = o.text,
              T = M.x,
              S = M.y,
              w = ao(a.CanvasPointToHtmlPoint([T, S]), 2),
              A = w[0],
              O = w[1]
            return { style: no(no({ left: A, top: O }, r), u) }
          }
          return null
        }),
        (n.prototype.componentDidUpdate = function () {
          var e = this.props.graphModel
          if (
            (this.ref.current &&
              (this.ref.current.focus(),
              this.placeCaretAtEnd(this.ref.current)),
            '' !== this.__prevText.id)
          ) {
            var n = this.__prevText,
              r = n.text,
              o = n.id
            e.updateText(o, r),
              e.eventCenter.emit(t.EventType.TEXT_UPDATE, {
                data: no({}, this.__prevText)
              }),
              (this.__prevText.id = ''),
              (this.__prevText.text = ''),
              (this.__prevText.type = '')
          }
        }),
        (n.prototype.placeCaretAtEnd = function (t) {
          if (
            void 0 !== window.getSelection &&
            void 0 !== document.createRange
          ) {
            var e = document.createRange()
            e.selectNodeContents(t), e.collapse(!1)
            var n = window.getSelection()
            null == n || n.removeAllRanges(), null == n || n.addRange(e)
          }
        }),
        (n.prototype.render = function () {
          var t,
            e = this.props.graphModel.textEditElement,
            n = this.state.style
          return e
            ? lo(
                'div',
                {
                  contentEditable: !0,
                  className: 'lf-text-input',
                  style: n,
                  ref: this.ref,
                  onKeyUp: this.keyupHandler,
                  onKeyDown: this.keydownHandler,
                  onKeyPress: this.keydownHandler,
                  onInput: this.inputHandler,
                  children:
                    null === (t = e.text) || void 0 === t ? void 0 : t.value
                },
                e.id
              )
            : null
        }),
        (n.toolName = 'text-edit-tool'),
        (n = oo([zE], n))
      )
    })(Fn),
    aE = (function (e) {
      function n(n) {
        var r = e.call(this, n) || this
        ;(r.handleMouseDown = function (t) {
          r.stepDrag.handleMouseDown(t)
        }),
          (r.handleWheelEvent = function (t) {
            var e, n
            t.preventDefault()
            var o = t.deltaX,
              i = t.deltaY,
              a = t.clientX,
              s = t.clientY,
              u = t.ctrlKey,
              l = new WheelEvent('wheel', {
                deltaX: o,
                deltaY: i,
                clientX: a,
                clientY: s,
                ctrlKey: u
              })
            null ===
              (n =
                null === (e = r.props.lf.container) || void 0 === e
                  ? void 0
                  : e.querySelector(
                      '.lf-canvas-overlay[name="canvas-overlay"]'
                    )) ||
              void 0 === n ||
              n.dispatchEvent(l)
          }),
          (r.onDragging = function (t) {
            var e = t.deltaX,
              n = t.deltaY,
              o = r.props,
              i = o.graphModel,
              a = o.lf.getTransform(),
              s = a.SCALE_X,
              u = a.SCALE_Y,
              l = i.getSelectElements(!0)
            i.moveNodes(
              l.nodes.map(function (t) {
                return t.id
              }),
              e / s,
              n / u
            )
          }),
          (r.handleContextMenu = function (e) {
            e.preventDefault()
            var n = r.props,
              o = n.graphModel,
              i = n.graphModel,
              a = i.eventCenter,
              s = i.selectElements,
              u = o.getPointByClient({ x: e.clientX, y: e.clientY }),
              l = { nodes: [], edges: [] }
            so([], ao(s.values()), !1).forEach(function (e) {
              e.BaseType === t.ElementType.NODE && l.nodes.push(e.getData()),
                e.BaseType === t.ElementType.EDGE && l.edges.push(e.getData())
            }),
              a.emit(t.EventType.SELECTION_CONTEXTMENU, {
                data: l,
                e: e,
                position: u
              })
          })
        var o = n.graphModel,
          i = o.gridSize,
          a = o.eventCenter
        return (
          (r.stepDrag = new E_({
            onDragging: r.onDragging,
            step: i,
            eventType: 'SELECTION',
            eventCenter: a
          })),
          r
        )
      }
      return (
        eo(n, e),
        (n.prototype.render = function () {
          var e,
            n,
            r = this.props.graphModel,
            o = r.selectElements,
            i = r.transformModel,
            a = this.props.lf.getTransform(),
            s = a.SCALE_X,
            u = a.SCALE_Y
          if (!(o.size <= 1)) {
            var l = Number.MAX_SAFE_INTEGER,
              c = Number.MAX_SAFE_INTEGER,
              d = Number.MIN_SAFE_INTEGER,
              p = Number.MIN_SAFE_INTEGER
            return (
              o.forEach(function (e) {
                var n
                e.BaseType === t.ElementType.NODE && (n = M_(e)),
                  e.BaseType === t.ElementType.EDGE && (n = A_(e)),
                  void 0 !== n &&
                    ((l = Math.min(l, n.x)),
                    (c = Math.min(c, n.y)),
                    (d = Math.max(d, n.x1)),
                    (p = Math.max(p, n.y1)))
              }),
              (e = ao(i.CanvasPointToHtmlPoint([l, c]), 2)),
              (l = e[0]),
              (c = e[1]),
              (n = ao(i.CanvasPointToHtmlPoint([d, p]), 2)),
              (d = n[0]),
              (p = n[1]),
              lo('div', {
                className: 'lf-multiple-select',
                style: {
                  left: ''.concat(l - (20 * s) / 2, 'px'),
                  top: ''.concat(c - (20 * u) / 2, 'px'),
                  width: ''.concat(d - l + 20 * s, 'px'),
                  height: ''.concat(p - c + 20 * u, 'px'),
                  'border-width': ''.concat(2 * s, 'px')
                },
                onMouseDown: this.handleMouseDown,
                onContextMenu: this.handleContextMenu,
                onWheel: this.handleWheelEvent
              })
            )
          }
        }),
        (n.toolName = 'multiple-select-tool'),
        (n = oo([zE], n))
      )
    })(Fn),
    sE = [iE, aE],
    uE = (function () {
      function e(e) {
        var n = this
        ;(this.toolMap = new Map()),
          (this.disabledToolMap = new Map()),
          (this.instance = e),
          Fp(sE, function (t) {
            n.isDisabled(t.toolName) || n.registerTool(t.toolName, t)
          })
        var r = e.graphModel
        r.eventCenter.on(
          ''
            .concat(t.EventType.GRAPH_TRANSFORM, ',')
            .concat(t.EventType.NODE_CLICK, ',')
            .concat(t.EventType.BLANK_CLICK, ' '),
          function () {
            var e,
              n = r.textEditElement,
              o = r.editConfigModel,
              i = o.edgeTextEdit,
              a = o.nodeTextEdit
            ;(i || a) &&
              n &&
              (null === (e = r.textEditElement) ||
                void 0 === e ||
                e.setElementState(t.ElementState.DEFAULT))
          }
        )
      }
      return (
        (e.prototype.isDisabled = function (t) {
          var e
          return (
            -1 !==
            (null === (e = this.instance.options.disabledTools) || void 0 === e
              ? void 0
              : e.indexOf(t))
          )
        }),
        (e.prototype.registerTool = function (t, e) {
          this.toolMap.set(t, e)
        }),
        (e.prototype.disableTool = function (t) {
          var e = this.toolMap.get(t)
          if (e)
            return this.disabledToolMap.set(t, e), this.toolMap.delete(t), !0
          throw new Error('禁用失败，不存在名为 ${tool} 的工具')
        }),
        (e.prototype.enableTool = function (t) {
          var e = this.disabledToolMap.get(t)
          if (e)
            return this.toolMap.set(t, e), this.disabledToolMap.delete(t), !0
          throw new Error('不存在名为 ${tool} 的工具')
        }),
        (e.prototype.getTools = function () {
          return Array.from(this.toolMap.values())
        }),
        (e.prototype.getInstance = function () {
          return this.instance
        }),
        (e.prototype.destroy = function () {
          this.toolMap.clear(), this.disabledToolMap.clear()
        }),
        oo([$], e.prototype, 'toolMap', void 0),
        oo([te], e.prototype, 'disableTool', null),
        oo([te], e.prototype, 'enableTool', null),
        e
      )
    })()
  function lE(t, e) {
    void 0 === e && (e = 'Illegal state'),
      t ||
        (function (t) {
          throw new Error('[mobx-utils] ' + t)
        })(e)
  }
  var cE = function (t) {
      return (
        t &&
        t !== Object.prototype &&
        Object.getOwnPropertyNames(t).concat(cE(Object.getPrototypeOf(t)) || [])
      )
    },
    dE = function (t) {
      return (function (t) {
        var e = cE(t),
          n = e.filter(function (t, n) {
            return e.indexOf(t) === n
          })
        return n
      })(t).filter(function (t) {
        return 'constructor' !== t && !~t.indexOf('__')
      })
    },
    pE = 'pending',
    hE = 'fulfilled',
    fE = 'rejected'
  function vE(t) {
    switch (this.state) {
      case pE:
        return t.pending && t.pending(this.value)
      case fE:
        return t.rejected && t.rejected(this.value)
      case hE:
        return t.fulfilled ? t.fulfilled(this.value) : this.value
    }
  }
  function yE(t, e) {
    if (
      (lE(arguments.length <= 2, 'fromPromise expects up to two arguments'),
      lE(
        'function' == typeof t ||
          ('object' == typeof t && t && 'function' == typeof t.then),
        'Please pass a promise or function to fromPromise'
      ),
      !0 === t.isPromiseBasedObservable)
    )
      return t
    'function' == typeof t && (t = new Promise(t))
    var n = t
    t.then(
      te('observableFromPromise-resolve', function (t) {
        ;(n.value = t), (n.state = hE)
      }),
      te('observableFromPromise-reject', function (t) {
        ;(n.value = t), (n.state = fE)
      })
    ),
      (n.isPromiseBasedObservable = !0),
      (n.case = vE)
    var r = e && e.state === hE ? e.value : void 0
    return de(n, { value: r, state: pE }, {}, { deep: !1 }), n
  }
  !(function (t) {
    ;(t.reject = te('fromPromise.reject', function (e) {
      var n = t(Promise.reject(e))
      return (n.state = fE), (n.value = e), n
    })),
      (t.resolve = te('fromPromise.resolve', function (e) {
        void 0 === e && (e = void 0)
        var n = t(Promise.resolve(e))
        return (n.state = hE), (n.value = e), n
      }))
  })(yE || (yE = {}))
  var gE = function (t, e, n, r) {
    var o,
      i = arguments.length,
      a =
        i < 3 ? e : null === r ? (r = Object.getOwnPropertyDescriptor(e, n)) : r
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, n, r)
    else
      for (var s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(e, n, a) : o(e, n)) || a)
    return i > 3 && a && Object.defineProperty(e, n, a), a
  }
  !(function () {
    function t(t, e) {
      var n = this
      ee(function () {
        ;(n.current = e), (n.subscription = t.subscribe(n))
      })
    }
    ;(t.prototype.dispose = function () {
      this.subscription && this.subscription.unsubscribe()
    }),
      (t.prototype.next = function (t) {
        this.current = t
      }),
      (t.prototype.complete = function () {
        this.dispose()
      }),
      (t.prototype.error = function (t) {
        ;(this.current = t), this.dispose()
      }),
      gE([$.ref], t.prototype, 'current', void 0),
      gE([te.bound], t.prototype, 'next', null),
      gE([te.bound], t.prototype, 'complete', null),
      gE([te.bound], t.prototype, 'error', null)
  })()
  var _E = function () {
      return (
        (_E =
          Object.assign ||
          function (t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
              for (var o in (e = arguments[n]))
                Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
            return t
          }),
        _E.apply(this, arguments)
      )
    },
    mE = function (t, e, n, r) {
      var o,
        i = arguments.length,
        a =
          i < 3
            ? e
            : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, n))
            : r
      if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, n, r)
      else
        for (var s = t.length - 1; s >= 0; s--)
          (o = t[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(e, n, a) : o(e, n)) || a)
      return i > 3 && a && Object.defineProperty(e, n, a), a
    },
    bE = [
      'model',
      'reset',
      'submit',
      'isDirty',
      'isPropertyDirty',
      'resetProperty'
    ]
  function xE(t) {
    if (!t) return 'ROOT'
    for (var e = []; t.parent; ) e.push(t.path), (t = t.parent)
    return e.reverse().join('/')
  }
  function EE(t) {
    return hn(t) || Je(t) || nn(t)
  }
  function ME(t, e) {
    var n = new WeakMap()
    function r(r) {
      var a = n.get(r.object)
      !(function (t, e) {
        switch (t.type) {
          case 'add':
            o(t.newValue, e, t.name)
            break
          case 'update':
            i(t.oldValue), o(t.newValue, e, t.name || '' + t.index)
            break
          case 'remove':
          case 'delete':
            i(t.oldValue)
            break
          case 'splice':
            t.removed.map(i),
              t.added.forEach(function (n, r) {
                return o(n, e, '' + (t.index + r))
              })
            for (var r = t.index + t.addedCount; r < t.object.length; r++)
              if (EE(t.object[r])) {
                var a = n.get(t.object[r])
                a && (a.path = '' + r)
              }
        }
      })(r, a),
        e(r, xE(a), t)
    }
    function o(t, e, i) {
      if (EE(t)) {
        var a = n.get(t)
        if (a) {
          if (a.parent !== e || a.path !== i)
            throw new Error(
              "The same observable object cannot appear twice in the same tree, trying to assign it to '" +
                xE(e) +
                '/' +
                i +
                "', but it already exists at '" +
                xE(a.parent) +
                '/' +
                a.path +
                "'"
            )
        } else {
          var s = { parent: e, path: i, dispose: Ne(t, r) }
          n.set(t, s),
            Ae(t).forEach(function (t) {
              var e = t[0]
              return o(t[1], s, e)
            })
        }
      }
    }
    function i(t) {
      if (EE(t)) {
        var e = n.get(t)
        if (!e) return
        n.delete(t), e.dispose(), we(t).forEach(i)
      }
    }
    return (
      o(t, void 0, ''),
      function () {
        i(t)
      }
    )
  }
  !(function () {
    function t(t) {
      var e = this
      ;(this.model = t),
        (this.localValues = $.map({})),
        (this.localComputedValues = $.map({})),
        (this.isPropertyDirty = function (t) {
          return e.localValues.has(t)
        }),
        lE(hn(t), 'createViewModel expects an observable object'),
        dE(t).forEach(function (n) {
          if (n !== T && '__mobxDidRunLazyInitializers' !== n) {
            if (
              (lE(
                -1 === bE.indexOf(n),
                'The propertyname ' +
                  n +
                  ' is reserved and cannot be used with viewModels'
              ),
              Ee(t, n))
            ) {
              var r = vn(t, n).derivation
              e.localComputedValues.set(n, rt(r.bind(e)))
            }
            var o = Object.getOwnPropertyDescriptor(t, n),
              i = o ? { enumerable: o.enumerable } : {}
            Object.defineProperty(
              e,
              n,
              _E(_E({}, i), {
                configurable: !0,
                get: function () {
                  return Ee(t, n)
                    ? e.localComputedValues.get(n).get()
                    : e.isPropertyDirty(n)
                    ? e.localValues.get(n)
                    : e.model[n]
                },
                set: te(function (t) {
                  t !== e.model[n]
                    ? e.localValues.set(n, t)
                    : e.localValues.delete(n)
                })
              })
            )
          }
        })
    }
    Object.defineProperty(t.prototype, 'isDirty', {
      get: function () {
        return this.localValues.size > 0
      },
      enumerable: !1,
      configurable: !0
    }),
      Object.defineProperty(t.prototype, 'changedValues', {
        get: function () {
          return this.localValues.toJS()
        },
        enumerable: !1,
        configurable: !0
      }),
      (t.prototype.submit = function () {
        var t = this
        Se(this.localValues).forEach(function (e) {
          var n = t.localValues.get(e),
            r = t.model[e]
          Je(r)
            ? r.replace(n)
            : nn(r)
            ? (r.clear(), r.merge(n))
            : xe(n) || (t.model[e] = n)
        }),
          this.localValues.clear()
      }),
      (t.prototype.reset = function () {
        this.localValues.clear()
      }),
      (t.prototype.resetProperty = function (t) {
        this.localValues.delete(t)
      }),
      mE([rt], t.prototype, 'isDirty', null),
      mE([rt], t.prototype, 'changedValues', null),
      mE([te.bound], t.prototype, 'submit', null),
      mE([te.bound], t.prototype, 'reset', null),
      mE([te.bound], t.prototype, 'resetProperty', null)
  })()
  var TE = (function () {
    var t = function (e, n) {
      return (
        (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e
            }) ||
          function (t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
          }),
        t(e, n)
      )
    }
    return function (e, n) {
      function r() {
        this.constructor = e
      }
      t(e, n),
        (e.prototype =
          null === n
            ? Object.create(n)
            : ((r.prototype = n.prototype), new r()))
    }
  })()
  !(function (t) {
    function e(e, n, r) {
      var o = void 0 === r ? {} : r,
        i = o.name,
        a = void 0 === i ? 'ogm' + ((1e3 * Math.random()) | 0) : i,
        s = o.keyToName,
        u =
          void 0 === s
            ? function (t) {
                return '' + t
              }
            : s,
        l = t.call(this) || this
      ;(l._keyToName = u),
        (l._groupBy = n),
        (l._ogmInfoKey = Symbol('ogmInfo' + a)),
        (l._base = e)
      for (var c = 0; c < e.length; c++) l._addItem(e[c])
      return (
        (l._disposeBaseObserver = Ne(l._base, function (t) {
          if ('splice' === t.type)
            Re(function () {
              for (var e = 0, n = t.removed; e < n.length; e++) {
                var r = n[e]
                l._removeItem(r)
              }
              for (var o = 0, i = t.added; o < i.length; o++) {
                var a = i[o]
                l._addItem(a)
              }
            })
          else {
            if ('update' !== t.type) throw new Error('illegal state')
            Re(function () {
              l._removeItem(t.oldValue), l._addItem(t.newValue)
            })
          }
        })),
        l
      )
    }
    TE(e, t),
      (e.prototype.clear = function () {
        throw new Error('not supported')
      }),
      (e.prototype.delete = function (t) {
        throw new Error('not supported')
      }),
      (e.prototype.set = function (t, e) {
        throw new Error('not supported')
      }),
      (e.prototype.dispose = function () {
        this._disposeBaseObserver()
        for (var t = 0; t < this._base.length; t++) {
          var e = this._base[t]
          e[this._ogmInfoKey].reaction(), delete e[this._ogmInfoKey]
        }
      }),
      (e.prototype._getGroupArr = function (e) {
        var n = t.prototype.get.call(this, e)
        return (
          void 0 === n &&
            ((n = $([], {
              name: 'GroupArray[' + this._keyToName(e) + ']',
              deep: !1
            })),
            t.prototype.set.call(this, e, n)),
          n
        )
      }),
      (e.prototype._removeFromGroupArr = function (e, n) {
        var r = t.prototype.get.call(this, e)
        1 === r.length
          ? t.prototype.delete.call(this, e)
          : (n === r.length - 1 ||
              ((r[n] = r[r.length - 1]),
              (r[n][this._ogmInfoKey].groupArrIndex = n)),
            r.length--)
      }),
      (e.prototype._addItem = function (t) {
        var e = this,
          n = this._groupBy(t),
          r = this._getGroupArr(n),
          o = {
            groupByValue: n,
            groupArrIndex: r.length,
            reaction: ae(
              function () {
                return e._groupBy(t)
              },
              function (n, r) {
                var o = t[e._ogmInfoKey]
                e._removeFromGroupArr(o.groupByValue, o.groupArrIndex)
                var i = e._getGroupArr(n),
                  a = i.length
                i.push(t), (o.groupByValue = n), (o.groupArrIndex = a)
              }
            )
          }
        Object.defineProperty(t, this._ogmInfoKey, {
          configurable: !0,
          enumerable: !1,
          value: o
        }),
          r.push(t)
      }),
      (e.prototype._removeItem = function (t) {
        var e = t[this._ogmInfoKey]
        this._removeFromGroupArr(e.groupByValue, e.groupArrIndex),
          e.reaction(),
          delete t[this._ogmInfoKey]
      })
  })(en),
    Promise.resolve(),
    'undefined' != typeof queueMicrotask ||
      ('undefined' != typeof process && process.nextTick)
  var SE = (function () {
      function e(t) {
        ;(this.undos = []),
          (this.redos = []),
          (this.callbacks = []),
          (this.stopWatch = null),
          (this.curData = null),
          (this.maxSize = 50),
          (this.waitTime = 100),
          (this.eventCenter = t)
      }
      return (
        (e.prototype.add = function (e) {
          Ef(Up(this.undos), e) ||
            (this.undos.push(e),
            Ef(this.curData, e) || (this.redos = []),
            this.eventCenter.emit(t.EventType.HISTORY_CHANGE, {
              data: {
                undos: this.undos,
                redos: this.redos,
                undoAble: this.undoAble(),
                redoAble: this.redoAble()
              }
            }),
            this.undos.length > this.maxSize && this.undos.shift())
        }),
        (e.prototype.undoAble = function () {
          return this.undos.length > 1
        }),
        (e.prototype.undo = function () {
          if (this.undoAble()) {
            var t = this.undos.pop()
            this.redos.push(t)
            var e = this.undos.pop()
            return (this.curData = ld(e)), e
          }
        }),
        (e.prototype.redoAble = function () {
          return this.redos.length > 0
        }),
        (e.prototype.redo = function () {
          if (this.redoAble()) {
            var t = this.redos.pop()
            return (this.curData = ld(t)), t
          }
        }),
        (e.prototype.watch = function (t) {
          var e = this
          this.stopWatch && this.stopWatch(),
            this.undos.push(t.modelToGraphData()),
            (this.stopWatch = ME(
              t,
              xp(function () {
                var n = t.modelToHistoryData()
                n && e.add(no({}, n))
              }, this.waitTime)
            ))
        }),
        (e.prototype.destroy = function () {
          ;(this.undos = []),
            (this.redos = []),
            (this.curData = null),
            this.stopWatch && this.stopWatch()
        }),
        e
      )
    })(),
    wE = {},
    AE = {
      get exports() {
        return wE
      },
      set exports(t) {
        wE = t
      }
    }
  !(function (t) {
    !(function (e, n) {
      if (e) {
        for (
          var r,
            o = {
              8: 'backspace',
              9: 'tab',
              13: 'enter',
              16: 'shift',
              17: 'ctrl',
              18: 'alt',
              20: 'capslock',
              27: 'esc',
              32: 'space',
              33: 'pageup',
              34: 'pagedown',
              35: 'end',
              36: 'home',
              37: 'left',
              38: 'up',
              39: 'right',
              40: 'down',
              45: 'ins',
              46: 'del',
              91: 'meta',
              93: 'meta',
              224: 'meta'
            },
            i = {
              106: '*',
              107: '+',
              109: '-',
              110: '.',
              111: '/',
              186: ';',
              187: '=',
              188: ',',
              189: '-',
              190: '.',
              191: '/',
              192: '`',
              219: '[',
              220: '\\',
              221: ']',
              222: "'"
            },
            a = {
              '~': '`',
              '!': '1',
              '@': '2',
              '#': '3',
              $: '4',
              '%': '5',
              '^': '6',
              '&': '7',
              '*': '8',
              '(': '9',
              ')': '0',
              _: '-',
              '+': '=',
              ':': ';',
              '"': "'",
              '<': ',',
              '>': '.',
              '?': '/',
              '|': '\\'
            },
            s = {
              option: 'alt',
              command: 'meta',
              return: 'enter',
              escape: 'esc',
              plus: '+',
              mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform)
                ? 'meta'
                : 'ctrl'
            },
            u = 1;
          u < 20;
          ++u
        )
          o[111 + u] = 'f' + u
        for (u = 0; u <= 9; ++u) o[u + 96] = u.toString()
        ;(v.prototype.bind = function (t, e, n) {
          var r = this
          return (
            (t = t instanceof Array ? t : [t]),
            r._bindMultiple.call(r, t, e, n),
            r
          )
        }),
          (v.prototype.unbind = function (t, e) {
            return this.bind.call(this, t, function () {}, e)
          }),
          (v.prototype.trigger = function (t, e) {
            var n = this
            return (
              n._directMap[t + ':' + e] && n._directMap[t + ':' + e]({}, t), n
            )
          }),
          (v.prototype.reset = function () {
            var t = this
            return (t._callbacks = {}), (t._directMap = {}), t
          }),
          (v.prototype.stopCallback = function (t, e) {
            if ((' ' + e.className + ' ').indexOf(' mousetrap ') > -1) return !1
            if (f(e, this.target)) return !1
            if ('composedPath' in t && 'function' == typeof t.composedPath) {
              var n = t.composedPath()[0]
              n !== t.target && (e = n)
            }
            return (
              'INPUT' == e.tagName ||
              'SELECT' == e.tagName ||
              'TEXTAREA' == e.tagName ||
              e.isContentEditable
            )
          }),
          (v.prototype.handleKey = function () {
            return this._handleKey.apply(this, arguments)
          }),
          (v.addKeycodes = function (t) {
            for (var e in t) t.hasOwnProperty(e) && (o[e] = t[e])
            r = null
          }),
          (v.init = function () {
            var t = v(n)
            for (var e in t)
              '_' !== e.charAt(0) &&
                (v[e] = (function (e) {
                  return function () {
                    return t[e].apply(t, arguments)
                  }
                })(e))
          }),
          v.init(),
          (e.Mousetrap = v),
          t.exports && (t.exports = v)
      }
      function l(t, e, n) {
        t.addEventListener
          ? t.addEventListener(e, n, !1)
          : t.attachEvent('on' + e, n)
      }
      function c(t) {
        if ('keypress' == t.type) {
          var e = String.fromCharCode(t.which)
          return t.shiftKey || (e = e.toLowerCase()), e
        }
        return o[t.which]
          ? o[t.which]
          : i[t.which]
          ? i[t.which]
          : String.fromCharCode(t.which).toLowerCase()
      }
      function d(t) {
        return 'shift' == t || 'ctrl' == t || 'alt' == t || 'meta' == t
      }
      function p(t, e, n) {
        return (
          n ||
            (n = (function () {
              if (!r)
                for (var t in ((r = {}), o))
                  (t > 95 && t < 112) || (o.hasOwnProperty(t) && (r[o[t]] = t))
              return r
            })()[t]
              ? 'keydown'
              : 'keypress'),
          'keypress' == n && e.length && (n = 'keydown'),
          n
        )
      }
      function h(t, e) {
        var n,
          r,
          o,
          i = []
        for (
          n = (function (t) {
            return '+' === t
              ? ['+']
              : (t = t.replace(/\+{2}/g, '+plus')).split('+')
          })(t),
            o = 0;
          o < n.length;
          ++o
        )
          (r = n[o]),
            s[r] && (r = s[r]),
            e && 'keypress' != e && a[r] && ((r = a[r]), i.push('shift')),
            d(r) && i.push(r)
        return { key: r, modifiers: i, action: (e = p(r, i, e)) }
      }
      function f(t, e) {
        return null !== t && t !== n && (t === e || f(t.parentNode, e))
      }
      function v(t) {
        var e = this
        if (((t = t || n), !(e instanceof v))) return new v(t)
        ;(e.target = t), (e._callbacks = {}), (e._directMap = {})
        var r,
          o = {},
          i = !1,
          a = !1,
          s = !1
        function u(t) {
          t = t || {}
          var e,
            n = !1
          for (e in o) t[e] ? (n = !0) : (o[e] = 0)
          n || (s = !1)
        }
        function p(t, n, r, i, a, s) {
          var u,
            l,
            c,
            p,
            h = [],
            f = r.type
          if (!e._callbacks[t]) return []
          for (
            'keyup' == f && d(t) && (n = [t]), u = 0;
            u < e._callbacks[t].length;
            ++u
          )
            if (
              ((l = e._callbacks[t][u]),
              (i || !l.seq || o[l.seq] == l.level) &&
                f == l.action &&
                (('keypress' == f && !r.metaKey && !r.ctrlKey) ||
                  ((c = n),
                  (p = l.modifiers),
                  c.sort().join(',') === p.sort().join(','))))
            ) {
              var v = !i && l.combo == a,
                y = i && l.seq == i && l.level == s
              ;(v || y) && e._callbacks[t].splice(u, 1), h.push(l)
            }
          return h
        }
        function f(t, n, r, o) {
          e.stopCallback(n, n.target || n.srcElement, r, o) ||
            (!1 === t(n, r) &&
              ((function (t) {
                t.preventDefault ? t.preventDefault() : (t.returnValue = !1)
              })(n),
              (function (t) {
                t.stopPropagation ? t.stopPropagation() : (t.cancelBubble = !0)
              })(n)))
        }
        function y(t) {
          'number' != typeof t.which && (t.which = t.keyCode)
          var n = c(t)
          n &&
            ('keyup' != t.type || i !== n
              ? e.handleKey(
                  n,
                  (function (t) {
                    var e = []
                    return (
                      t.shiftKey && e.push('shift'),
                      t.altKey && e.push('alt'),
                      t.ctrlKey && e.push('ctrl'),
                      t.metaKey && e.push('meta'),
                      e
                    )
                  })(t),
                  t
                )
              : (i = !1))
        }
        function g(t, e, n, a) {
          function l(e) {
            return function () {
              ;(s = e), ++o[t], clearTimeout(r), (r = setTimeout(u, 1e3))
            }
          }
          function d(e) {
            f(n, e, t), 'keyup' !== a && (i = c(e)), setTimeout(u, 10)
          }
          o[t] = 0
          for (var p = 0; p < e.length; ++p) {
            var v = p + 1 === e.length ? d : l(a || h(e[p + 1]).action)
            _(e[p], v, a, t, p)
          }
        }
        function _(t, n, r, o, i) {
          e._directMap[t + ':' + r] = n
          var a,
            s = (t = t.replace(/\s+/g, ' ')).split(' ')
          s.length > 1
            ? g(t, s, n, r)
            : ((a = h(t, r)),
              (e._callbacks[a.key] = e._callbacks[a.key] || []),
              p(a.key, a.modifiers, { type: a.action }, o, t, i),
              e._callbacks[a.key][o ? 'unshift' : 'push']({
                callback: n,
                modifiers: a.modifiers,
                action: a.action,
                seq: o,
                level: i,
                combo: t
              }))
        }
        ;(e._handleKey = function (t, e, n) {
          var r,
            o = p(t, e, n),
            i = {},
            l = 0,
            c = !1
          for (r = 0; r < o.length; ++r)
            o[r].seq && (l = Math.max(l, o[r].level))
          for (r = 0; r < o.length; ++r)
            if (o[r].seq) {
              if (o[r].level != l) continue
              ;(c = !0),
                (i[o[r].seq] = 1),
                f(o[r].callback, n, o[r].combo, o[r].seq)
            } else c || f(o[r].callback, n, o[r].combo)
          var h = 'keypress' == n.type && a
          n.type != s || d(t) || h || u(i), (a = c && 'keydown' == n.type)
        }),
          (e._bindMultiple = function (t, e, n) {
            for (var r = 0; r < t.length; ++r) _(t[r], e, n)
          }),
          l(t, 'keypress', y),
          l(t, 'keydown', y),
          l(t, 'keyup', y)
      }
    })(
      'undefined' != typeof window ? window : null,
      'undefined' != typeof window ? document : null
    )
  })(AE)
  var OE = wE,
    DE = null
  function NE(t, e) {
    return (
      (t.x += e),
      (t.y += e),
      xf(t.text) || ((t.text.x += e), (t.text.y += e)),
      t
    )
  }
  function PE(t, e) {
    return (
      t.startPoint && ((t.startPoint.x += e), (t.startPoint.y += e)),
      t.endPoint && ((t.endPoint.x += e), (t.endPoint.y += e)),
      t.pointsList &&
        t.pointsList.length > 0 &&
        t.pointsList.forEach(function (t) {
          ;(t.x += e), (t.y += e)
        }),
      xf(t.text) || ((t.text.x += e), (t.text.y += e)),
      t
    )
  }
  var CE = 40,
    IE = 40
  function LE(t, e) {
    var n = t.keyboard,
      r = n.options.keyboard
    n.on(['cmd + c', 'ctrl + c'], function () {
      if (((IE = CE), !(null == r ? void 0 : r.enabled))) return !0
      if (e.textEditElement) return !0
      var n = t.options.guards,
        o = e.getSelectElements(!1)
      return !(!n || !n.beforeClone || n.beforeClone(o)) ||
        (0 === o.nodes.length && 0 === o.edges.length)
        ? ((DE = null), !0)
        : ((DE = o).nodes.forEach(function (t) {
            return NE(t, CE)
          }),
          DE.edges.forEach(function (t) {
            return PE(t, CE)
          }),
          !1)
    }),
      n.on(['cmd + v', 'ctrl + v'], function () {
        if (!(null == r ? void 0 : r.enabled)) return !0
        if (e.textEditElement) return !0
        if (DE && (DE.nodes || DE.edges)) {
          t.clearSelectElements()
          var n = t.addElements(DE, IE)
          if (!n) return !0
          n.nodes.forEach(function (e) {
            return t.selectElementById(e.id, !0)
          }),
            n.edges.forEach(function (e) {
              return t.selectElementById(e.id, !0)
            }),
            DE.nodes.forEach(function (t) {
              return NE(t, CE)
            }),
            DE.edges.forEach(function (t) {
              return PE(t, CE)
            }),
            (IE += CE)
        }
        return !1
      }),
      n.on(['cmd + z', 'ctrl + z'], function () {
        return (
          !(null == r ? void 0 : r.enabled) ||
          !!e.textEditElement ||
          (t.undo(), !1)
        )
      }),
      n.on(['cmd + y', 'ctrl + y'], function () {
        return (
          !(null == r ? void 0 : r.enabled) ||
          !!e.textEditElement ||
          (t.redo(), !1)
        )
      }),
      n.on(['backspace'], function () {
        if (!(null == r ? void 0 : r.enabled)) return !0
        if (e.textEditElement) return !0
        var n = e.getSelectElements(!0)
        return (
          t.clearSelectElements(),
          n.edges.forEach(function (e) {
            return e.id && t.deleteEdge(e.id)
          }),
          n.nodes.forEach(function (e) {
            return e.id && t.deleteNode(e.id)
          }),
          !1
        )
      })
  }
  var jE = (function () {
      function t(t) {
        t.keyboard || (t.keyboard = { enabled: !1 }), (this.options = t)
        var e = t.lf
        ;(this.target = e.container),
          (this.mousetrap = new OE(this.target)),
          t.keyboard.enabled && !e.options.isSilentMode && this.enable(!0)
      }
      return (
        (t.prototype.initShortcuts = function () {
          var t,
            e = this,
            n = (null !== (t = this.options.keyboard) && void 0 !== t ? t : {})
              .shortcuts
          if (n)
            if (No(n))
              n.forEach(function (t) {
                var n = t.keys,
                  r = t.callback,
                  o = t.action
                return e.on(n, r, o)
              })
            else {
              var r = n.keys,
                o = n.callback,
                i = n.action
              this.on(r, o, i)
            }
        }),
        (t.prototype.on = function (t, e, n) {
          this.mousetrap.bind(this.getKeys(t), e, n)
        }),
        Object.defineProperty(t.prototype, 'disabled', {
          get: function () {
            var t, e
            return (
              !0 !==
              (null ===
                (e =
                  null === (t = this.options) || void 0 === t
                    ? void 0
                    : t.keyboard) || void 0 === e
                ? void 0
                : e.enabled)
            )
          },
          enumerable: !1,
          configurable: !0
        }),
        (t.prototype.off = function (t, e) {
          this.mousetrap.unbind(this.getKeys(t), e)
        }),
        (t.prototype.enable = function (t) {
          ;(this.disabled || t) &&
            (this.options.keyboard && (this.options.keyboard.enabled = !0),
            this.target instanceof HTMLElement &&
              (this.target.setAttribute('tabindex', '-1'),
              (this.target.style.outline = 'none')))
        }),
        (t.prototype.disable = function () {
          this.disabled ||
            (this.options.keyboard && (this.options.keyboard.enabled = !1),
            this.target instanceof HTMLElement &&
              this.target.removeAttribute('tabindex'))
        }),
        (t.prototype.destroy = function () {
          this.mousetrap.reset()
        }),
        (t.prototype.getKeys = function (t) {
          var e = this
          return (Array.isArray(t) ? t : [t]).map(function (t) {
            return e.formatKey(t)
          })
        }),
        (t.prototype.formatKey = function (t) {
          return t
            .toLowerCase()
            .replace(/\s/g, '')
            .replace('delete', 'del')
            .replace('cmd', 'command')
        }),
        t
      )
    })(),
    RE = Symbol('plugin registered by Logicflow.use'),
    kE = (function () {
      function e(e) {
        var n,
          r = this
        ;(this.viewMap = new Map()),
          (this.components = []),
          (this.extension = {}),
          (this.setView = function (t, e) {
            return r.viewMap.set(t, e)
          }),
          (this.getView = function (t) {
            return r.viewMap.get(t)
          })
        var o = t.Options.get(e),
          i = o.container,
          a = o.width,
          s = o.height
        ;(this.options = o),
          (this.container = this.initContainer(i, a, s)),
          (this.graphModel = new Px(
            no(no({}, o), { container: this.container })
          )),
          (this.plugins = null !== (n = o.plugins) && void 0 !== n ? n : [])
        var u = this.graphModel.eventCenter
        ;(this.tool = new uE(this)),
          (this.dnd = new oE({ lf: this })),
          (this.history = new SE(u)),
          (this.keyboard = new jE({ lf: this, keyboard: o.keyboard })),
          !1 !== o.snapline &&
            ((this.snaplineModel = new Cx(this.graphModel)),
            (function (t, e) {
              t.on('node:mousemove', function (t) {
                var n = t.data
                e.setNodeSnapLine(n)
              }),
                t.on('node:mouseup', function () {
                  e.clearSnapline()
                })
            })(u, this.snaplineModel)),
          o.isSilentMode ||
            (LE(this, this.graphModel), this.keyboard.initShortcuts()),
          this.defaultRegister(),
          this.installPlugins(o.disabledPlugins)
      }
      return (
        (e.prototype.initContainer = function (t, e, n) {
          var r = document.createElement('div')
          return (
            (r.style.position = 'relative'),
            (r.style.width = e ? ''.concat(e, 'px') : '100%'),
            (r.style.height = n ? ''.concat(n, 'px') : '100%'),
            (t.innerHTML = ''),
            t.appendChild(r),
            r
          )
        }),
        Object.defineProperty(e.prototype, Symbol.toStringTag, {
          get: function () {
            return e.toStringTag
          },
          enumerable: !1,
          configurable: !0
        }),
        (e.prototype.register = function (t, e, n) {
          if ((void 0 === n && (n = !0), 'string' == typeof t)) {
            var r = {
              BaseEdge: tE,
              BaseEdgeModel: ax,
              BaseNode: Wx,
              BaseNodeModel: cx,
              RectNode: Yx,
              RectNodeModel: vx,
              CircleNode: Fx,
              CircleNodeModel: dx,
              PolygonNode: Vx,
              PolygonNodeModel: fx,
              TextNode: Zx,
              TextNodeModel: yx,
              LineEdge: nE,
              LineEdgeModel: ux,
              DiamondNode: Kx,
              DiamondNodeModel: px,
              PolylineEdge: rE,
              PolylineEdgeModel: lx,
              BezierEdge: eE,
              BezierEdgeModel: sx,
              EllipseNode: qx,
              EllipseNodeModel: hx,
              HtmlNode: $x,
              HtmlNodeModel: gx,
              h: Xn,
              type: t
            }
            if (
              (this.viewMap.forEach(function (t) {
                var e = t.extendKey
                e && (r[e] = t)
              }),
              this.graphModel.modelMap.forEach(function (t) {
                var e = t.extendKey
                e && (r[e] = t)
              }),
              e)
            ) {
              var o = e(r),
                i = o.view,
                a = o.model,
                s = i
              n && !s.isObserved && ((s.isObserved = !0), (s = zE(s))),
                this.setView(t, s),
                this.graphModel.setModel(t, a)
            }
          } else this.registerElement(t)
        }),
        (e.prototype.registerElement = function (t) {
          var e = t.view
          !1 === t.isObserverView ||
            e.isObserved ||
            ((e.isObserved = !0), (e = zE(e))),
            this.setView(t.type, e),
            this.graphModel.setModel(t.type, t.model)
        }),
        (e.prototype.batchRegister = function (t) {
          var e = this
          void 0 === t && (t = []),
            Fp(t, function (t) {
              e.registerElement(t)
            })
        }),
        (e.prototype.defaultRegister = function () {
          var t = [
            { type: 'rect', view: Yx, model: vx },
            { type: 'circle', view: Fx, model: dx },
            { type: 'polygon', view: Vx, model: fx },
            { type: 'text', view: Zx, model: yx },
            { type: 'ellipse', view: qx, model: hx },
            { type: 'diamond', view: Kx, model: px },
            { type: 'html', view: $x, model: gx },
            { type: 'line', view: nE, model: ux },
            { type: 'polyline', view: rE, model: lx },
            { type: 'bezier', view: eE, model: sx }
          ]
          this.batchRegister(t)
        }),
        (e.prototype.addNode = function (e, n, r) {
          return (
            void 0 === n && (n = t.EventType.NODE_ADD),
            this.graphModel.addNode(e, n, r)
          )
        }),
        (e.prototype.deleteNode = function (t) {
          var e = this.graphModel.getNodeModelById(t)
          if (!e) return !1
          var n = e.getData(),
            r = this.options.guards,
            o = !(null == r ? void 0 : r.beforeDelete) || r.beforeDelete(n)
          return o && this.graphModel.deleteNode(t), o
        }),
        (e.prototype.cloneNode = function (t) {
          var e = this.graphModel.getNodeModelById(t),
            n = null == e ? void 0 : e.getData()
          if (n) {
            var r = this.options.guards
            if (!(null == r ? void 0 : r.beforeClone) || r.beforeClone(n))
              return this.graphModel.cloneNode(t)
          }
        }),
        (e.prototype.changeNodeId = function (t, e) {
          return this.graphModel.changeNodeId(t, e)
        }),
        (e.prototype.changeNodeType = function (t, e) {
          this.graphModel.changeNodeType(t, e)
        }),
        (e.prototype.getNodeModelById = function (t) {
          return this.graphModel.getNodeModelById(t)
        }),
        (e.prototype.getNodeDataById = function (t) {
          var e = this.getNodeModelById(t)
          return null == e ? void 0 : e.getData()
        }),
        (e.prototype.getNodeIncomingEdge = function (t) {
          return this.graphModel.getNodeIncomingEdge(t)
        }),
        (e.prototype.getNodeOutgoingEdge = function (t) {
          return this.graphModel.getNodeOutgoingEdge(t)
        }),
        (e.prototype.getNodeIncomingNode = function (t) {
          return this.graphModel.getNodeIncomingNode(t)
        }),
        (e.prototype.getNodeOutgoingNode = function (t) {
          return this.graphModel.getNodeOutgoingNode(t)
        }),
        (e.prototype.createFakeNode = function (t) {
          var e = this.graphModel.modelMap.get(t.type)
          if (!e) return null
          var n = new e(no(no({}, t), { virtual: !0 }), this.graphModel)
          return this.graphModel.setFakeNode(n), n
        }),
        (e.prototype.removeFakeNode = function () {
          this.graphModel.removeFakeNode()
        }),
        (e.prototype.setNodeSnapLine = function (t) {
          var e
          null === (e = this.snaplineModel) ||
            void 0 === e ||
            e.setNodeSnapLine(t)
        }),
        (e.prototype.removeNodeSnapLine = function () {
          var t
          null === (t = this.snaplineModel) || void 0 === t || t.clearSnapline()
        }),
        (e.prototype.setDefaultEdgeType = function (t) {
          this.graphModel.setDefaultEdgeType(t)
        }),
        (e.prototype.addEdge = function (t) {
          return this.graphModel.addEdge(t)
        }),
        (e.prototype.getEdgeDataById = function (t) {
          var e = this.getEdgeModelById(t)
          return null == e ? void 0 : e.getData()
        }),
        (e.prototype.getEdgeModelById = function (t) {
          return this.graphModel.getEdgeModelById(t)
        }),
        (e.prototype.getEdgeModels = function (t) {
          var e = t.sourceNodeId,
            n = t.targetNodeId,
            r = [],
            o = this.graphModel.edges
          return (
            e && n
              ? Fp(o, function (t) {
                  t.sourceNodeId === e && t.targetNodeId === n && r.push(t)
                })
              : e
              ? Fp(o, function (t) {
                  t.sourceNodeId === e && r.push(t)
                })
              : n &&
                Fp(o, function (t) {
                  t.targetNodeId === n && r.push(t)
                }),
            r
          )
        }),
        (e.prototype.changeEdgeId = function (t, e) {
          return this.graphModel.changeEdgeId(t, e)
        }),
        (e.prototype.changeEdgeType = function (t, e) {
          this.graphModel.changeEdgeType(t, e)
        }),
        (e.prototype.deleteEdge = function (t) {
          var e = this.graphModel.getEdgeModelById(t)
          if (!e) return !1
          var n = e.getData(),
            r = this.options.guards,
            o = !(null == r ? void 0 : r.beforeDelete) || r.beforeDelete(n)
          return o && this.graphModel.deleteEdgeById(t), o
        }),
        (e.prototype.deleteEdgeByNodeId = function (t) {
          var e = t.sourceNodeId,
            n = t.targetNodeId
          e && n
            ? this.graphModel.deleteEdgeBySourceAndTarget(e, n)
            : e
            ? this.graphModel.deleteEdgeBySource(e)
            : n && this.graphModel.deleteEdgeByTarget(n)
        }),
        (e.prototype.getNodeEdges = function (t) {
          return this.graphModel.getNodeEdges(t)
        }),
        (e.prototype.addElements = function (t, e) {
          var n = this,
            r = t.nodes,
            o = t.edges
          void 0 === e && (e = 40)
          var i = {},
            a = { nodes: [], edges: [] }
          return (
            Fp(r, function (t) {
              var e = t.id,
                r = n.addNode(t)
              e && (i[e] = r.id), a.nodes.push(r)
            }),
            Fp(o, function (t) {
              var e = t.sourceNodeId,
                r = t.targetNodeId
              i[e] && (e = i[e]), i[r] && (r = i[r])
              var o = n.graphModel.addEdge(
                no(no({}, t), { sourceNodeId: e, targetNodeId: r })
              )
              a.edges.push(o)
            }),
            a
          )
        }),
        (e.prototype.selectElementById = function (t, e, n) {
          void 0 === e && (e = !1),
            void 0 === n && (n = !0),
            this.graphModel.selectElementById(t, e),
            !e && n && this.graphModel.toFront(t)
        }),
        (e.prototype.getSelectElements = function (t) {
          return void 0 === t && (t = !0), this.graphModel.getSelectElements(t)
        }),
        (e.prototype.clearSelectElements = function () {
          this.graphModel.clearSelectElements()
        }),
        (e.prototype.getModelById = function (t) {
          return this.graphModel.getElement(t)
        }),
        (e.prototype.getDataById = function (t) {
          var e
          return null === (e = this.graphModel.getElement(t)) || void 0 === e
            ? void 0
            : e.getData()
        }),
        (e.prototype.deleteElement = function (e) {
          var n,
            r,
            o,
            i = this.getModelById(e)
          return (
            !!i &&
            null !==
              (o =
                null ===
                  (r = (((n = {})[t.ElementType.NODE] = this.deleteNode),
                  (n[t.ElementType.EDGE] = this.deleteEdge),
                  n)[i.BaseType]) || void 0 === r
                  ? void 0
                  : r.call(this, e)) &&
            void 0 !== o &&
            o
          )
        }),
        (e.prototype.setElementZIndex = function (t, e) {
          return this.graphModel.setElementZIndex(t, e)
        }),
        (e.prototype.getAreaElement = function (t, e, n, r, o) {
          return (
            void 0 === n && (n = !0),
            void 0 === r && (r = !0),
            void 0 === o && (o = !1),
            this.graphModel.getAreaElement(t, e, n, r, o).map(function (t) {
              return t.getData()
            })
          )
        }),
        (e.prototype.setProperties = function (t, e) {
          var n
          null === (n = this.graphModel.getElement(t)) ||
            void 0 === n ||
            n.setProperties(h_(e))
        }),
        (e.prototype.getProperties = function (t) {
          var e
          return null === (e = this.graphModel.getElement(t)) || void 0 === e
            ? void 0
            : e.getProperties()
        }),
        (e.prototype.deleteProperty = function (t, e) {
          var n
          null === (n = this.graphModel.getElement(t)) ||
            void 0 === n ||
            n.deleteProperty(e)
        }),
        (e.prototype.updateAttributes = function (t, e) {
          this.graphModel.updateAttributes(t, e)
        }),
        (e.prototype.editText = function (t) {
          this.graphModel.editText(t)
        }),
        (e.prototype.updateText = function (t, e) {
          this.graphModel.updateText(t, e)
        }),
        (e.prototype.updateEditConfig = function (t) {
          var e = this.graphModel,
            n = e.editConfigModel,
            r = e.transformModel,
            o = n.snapGrid
          if (
            (n.updateEditConfig(t),
            void 0 !== (null == t ? void 0 : t.stopMoveGraph) &&
              r.updateTranslateLimits(t.stopMoveGraph),
            (null == t ? void 0 : t.isSilentMode)
              ? this.keyboard.disable()
              : this.keyboard.enable(!0),
            !Of(null == t ? void 0 : t.snapGrid) && t.snapGrid !== o)
          ) {
            var i = this.graphModel.grid.size,
              a = void 0 === i ? 1 : i
            this.graphModel.updateGridSize(t.snapGrid ? a : 1)
          }
        }),
        (e.prototype.getEditConfig = function () {
          return this.graphModel.editConfigModel.getConfig()
        }),
        (e.prototype.setTheme = function (t) {
          this.graphModel.setTheme(t)
        }),
        (e.prototype.focusByElement = function (t) {
          var e = void 0,
            n = this.getNodeModelById(t)
          if (n) {
            var r = n.getData()
            e = { x: r.x, y: r.y }
          }
          var o = this.getEdgeModelById(t)
          if (o) {
            var i = o.textPosition
            e = { x: i.x, y: i.y }
          }
          e && this.focusByCoordinate(e)
        }),
        (e.prototype.focusByCoordinate = function (t) {
          var e = this.graphModel,
            n = e.transformModel,
            r = e.width,
            o = e.height,
            i = t.x,
            a = t.y
          n.focusOn(i, a, r, o)
        }),
        (e.prototype.focusOn = function (t) {
          if ('string' == typeof t) this.focusByElement(t)
          else if ('x' in t && 'y' in t) this.focusByCoordinate(t)
          else {
            var e = t.id,
              n = t.coordinate
            e && this.focusByElement(e), n && this.focusByCoordinate(n)
          }
        }),
        (e.prototype.resize = function (t, e) {
          this.graphModel.resize(t, e),
            (this.options.width = this.graphModel.width),
            (this.options.height = this.graphModel.height)
        }),
        (e.prototype.toFront = function (t) {
          this.graphModel.toFront(t)
        }),
        (e.prototype.getPointByClient = function (t, e) {
          return 'object' == typeof t
            ? this.graphModel.getPointByClient(t)
            : 'number' == typeof e
            ? this.graphModel.getPointByClient({ x: t, y: e })
            : void 0
        }),
        (e.prototype.getGraphData = function () {
          for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
          var n = this.getGraphRawData()
          return this.adapterOut
            ? this.adapterOut.apply(this, so([n], ao(t), !1))
            : n
        }),
        (e.prototype.getGraphRawData = function () {
          return this.graphModel.modelToGraphData()
        }),
        (e.prototype.clearData = function () {
          this.graphModel.clearData(), this.render({})
        }),
        (e.prototype.renderRawData = function (e) {
          this.graphModel.graphDataToModel(h_(e)),
            !1 !== this.options.history && this.history.watch(this.graphModel),
            Yr(
              lo(jx, {
                getView: this.getView,
                tool: this.tool,
                options: this.options,
                dnd: this.dnd,
                snaplineModel: this.snaplineModel,
                graphModel: this.graphModel
              }),
              this.container
            ),
            this.emit(t.EventType.GRAPH_RENDERED, {
              data: this.graphModel.modelToGraphData(),
              graphModel: this.graphModel
            })
        }),
        (e.prototype.render = function (t) {
          var e = ld(t)
          this.adapterIn && (e = this.adapterIn(e)), this.renderRawData(e)
        }),
        (e.prototype.undo = function () {
          if (this.history.undoAble()) {
            var t = h_(this.history.undo())
            this.clearSelectElements(), this.graphModel.graphDataToModel(t)
          }
        }),
        (e.prototype.redo = function () {
          if (this.history.redoAble()) {
            var t = h_(this.history.redo())
            this.clearSelectElements(), this.graphModel.graphDataToModel(t)
          }
        }),
        (e.prototype.zoom = function (t, e) {
          return this.graphModel.transformModel.zoom(t, e)
        }),
        (e.prototype.resetZoom = function () {
          this.graphModel.transformModel.resetZoom()
        }),
        (e.prototype.setZoomMiniSize = function (t) {
          this.graphModel.transformModel.setZoomMiniSize(t)
        }),
        (e.prototype.setZoomMaxSize = function (t) {
          this.graphModel.transformModel.setZoomMaxSize(t)
        }),
        (e.prototype.getTransform = function () {
          var t = this.graphModel.transformModel
          return {
            SCALE_X: t.SCALE_X,
            SCALE_Y: t.SCALE_Y,
            TRANSLATE_X: t.TRANSLATE_X,
            TRANSLATE_Y: t.TRANSLATE_Y
          }
        }),
        (e.prototype.translate = function (t, e) {
          this.graphModel.transformModel.translate(t, e)
        }),
        (e.prototype.resetTranslate = function () {
          var t = this.graphModel.transformModel,
            e = t.TRANSLATE_X,
            n = t.TRANSLATE_Y
          this.translate(-e, -n)
        }),
        (e.prototype.translateCenter = function () {
          this.graphModel.translateCenter()
        }),
        (e.prototype.fitView = function (t, e) {
          void 0 === e && (e = t), this.graphModel.fitView(t, e)
        }),
        (e.prototype.openEdgeAnimation = function (t) {
          this.graphModel.openEdgeAnimation(t)
        }),
        (e.prototype.closeEdgeAnimation = function (t) {
          this.graphModel.closeEdgeAnimation(t)
        }),
        (e.prototype.on = function (t, e) {
          this.graphModel.eventCenter.on(t, e)
        }),
        (e.prototype.off = function (t, e) {
          this.graphModel.eventCenter.off(t, e)
        }),
        (e.prototype.once = function (t, e) {
          this.graphModel.eventCenter.once(t, e)
        }),
        (e.prototype.emit = function (t, e) {
          this.graphModel.eventCenter.emit(t, e)
        }),
        (e.use = function (t, e) {
          var n,
            r = t.pluginName
          if (!r) throw new Error('请给插件指定 pluginName!')
          this.extensions.set(
            r,
            (((n = {})[RE] = RE), (n.extension = t), (n.props = e), n)
          )
        }),
        (e.prototype.installPlugins = function (t) {
          var n = this
          void 0 === t && (t = [])
          var r = Array.from(e.extensions, function (t) {
            return ao(t, 2)[1]
          })
          Fp(so(so([], ao(this.plugins), !1), ao(r), !1), function (e) {
            var r, o
            RE in e ? ((r = e.extension), (o = e.props)) : (r = e)
            var i = null == r ? void 0 : r.pluginName
            ;-1 === Kh(t, i) && n.installPlugin(r, o)
          })
        }),
        (e.prototype.installPlugin = function (t, n) {
          var r, o
          if ('pluginName' in t && 'install' in t) {
            var i = t.pluginName,
              a = t.install,
              s = t.render
            i &&
              (a && a.call(t, this, e),
              s && this.components.push(s.bind(t)),
              (this.extension[i] = t))
          } else {
            var u = t,
              l = u.pluginName,
              c = new u({
                lf: this,
                LogicFlow: e,
                props: n,
                options:
                  null !==
                    (o =
                      null === (r = this.options.pluginsOptions) || void 0 === r
                        ? void 0
                        : r[l]) && void 0 !== o
                    ? o
                    : {}
              })
            c.render && this.components.push(c.render.bind(c)),
              (this.extension[l] = c)
          }
        }),
        (e.prototype.destroy = function () {
          this.clearData(),
            Yr(null, this.container),
            this.keyboard.destroy(),
            this.graphModel.destroy(),
            this.tool.destroy(),
            this.history.destroy()
        }),
        (e.extensions = new Map()),
        e
      )
    })()
  !(function (t) {
    t.toStringTag = 'LF.'.concat(t.name)
  })(kE || (kE = {}))
  var BE = kE
  function zE(t) {
    return o.observer(t)
  }
  ;(t.AdjustPoint = Jx),
    (t.Arrow = Qx),
    (t.BaseEdge = tE),
    (t.BaseEdgeModel = ax),
    (t.BaseNode = Wx),
    (t.BaseNodeModel = cx),
    (t.BaseText = Xx),
    (t.BezierEdge = eE),
    (t.BezierEdgeModel = sx),
    (t.Circle = Ib),
    (t.CircleNode = Fx),
    (t.CircleNodeModel = dx),
    (t.Component = Fn),
    (t.DEFAULT_GRID_SIZE = 10),
    (t.DEFAULT_VISIBLE_SPACE = x_),
    (t.DiamondNode = Kx),
    (t.DiamondNodeModel = px),
    (t.ELEMENT_MAX_Z_INDEX = 9999),
    (t.EditConfigModel = bx),
    (t.Ellipse = Lb),
    (t.EllipseNode = qx),
    (t.EllipseNodeModel = hx),
    (t.EventEmitter = xx),
    (t.GraphModel = Px),
    (t.HtmlNode = $x),
    (t.HtmlNodeModel = gx),
    (t.Keyboard = jE),
    (t.Line = Nb),
    (t.LineEdge = nE),
    (t.LineEdgeModel = ux),
    (t.LineText = Gx),
    (t.LogicFlow = BE),
    (t.LogicFlowUtil = ix),
    (t.Matrix = Im),
    (t.Path = Cb),
    (t.Point = Cm),
    (t.Polygon = jb),
    (t.PolygonNode = Vx),
    (t.PolygonNodeModel = fx),
    (t.Polyline = Rb),
    (t.PolylineEdge = rE),
    (t.PolylineEdgeModel = lx),
    (t.Rect = Pb),
    (t.RectNode = Yx),
    (t.RectNodeModel = vx),
    (t.RotateMatrix = Lm),
    (t.ScaleMatrix = jm),
    (t.SnaplineModel = Cx),
    (t.StepDrag = E_),
    (t.Text = Ob),
    (t.TextNode = Zx),
    (t.TextNodeModel = yx),
    (t.Tool = uE),
    (t.TransformModel = Lx),
    (t.TranslateMatrix = Rm),
    (t.Vector = Pm),
    (t.action = te),
    (t.calculateWidthAndHeight = Yb),
    (t.cancelRaf = Ab),
    (t.computed = rt),
    (t.configure = ce),
    (t.costByPoints = F_),
    (t.createEdgeGenerator = Em),
    (t.createRaf = wb),
    (t.createRef = Wn),
    (t.createUuid = Mb),
    (t.default = BE),
    (t.defaultAnimationOffConfig = u_),
    (t.defaultAnimationOnConfig = l_),
    (t.defaultTheme = Jb),
    (t.degrees = $b),
    (t.distance = Hm),
    (t.estimateDistance = Y_),
    (t.filterRepeatPoints = I_),
    (t.formatAnchorConnectValidateData = nb),
    (t.formatData = h_),
    (t.getAnchors = km),
    (t.getAppendAttributes = fm),
    (t.getBBoxCrossPointsByPoint = W_),
    (t.getBBoxOfPoints = z_),
    (t.getBBoxXCrossPoints = X_),
    (t.getBBoxYCrossPoints = G_),
    (t.getBezierControlPoints = vm),
    (t.getBezierOutline = w_),
    (t.getBezierPoints = ym),
    (t.getBoxByOriginNode = tm),
    (t.getBytesLength = dm),
    (t.getClosestAnchor = Um),
    (t.getClosestPointOfPolyline = mm),
    (t.getClosestRadiusCenter = Fm),
    (t.getCrossPointInRect = am),
    (t.getCrossPointOfLine = O_),
    (t.getCrossPointWithCircle = Vm),
    (t.getCrossPointWithEllipse = Zm),
    (t.getCrossPointWithPolygon = $m),
    (t.getEdgeOutline = A_),
    (t.getEndTangent = _m),
    (t.getExpandedBBox = j_),
    (t.getExpandedBBoxPoint = k_),
    (t.getGridOffset = Sm),
    (t.getHtmlTextHeight = tb),
    (t.getLineOutline = T_),
    (t.getLongestEdge = rm),
    (t.getMinIndex = ox),
    (t.getNextNeighborPoints = J_),
    (t.getNodeAnchorPosition = Qm),
    (t.getNodeBBox = Wm),
    (t.getNodeOutline = M_),
    (t.getPointsFromBBox = U_),
    (t.getPolylineOutline = S_),
    (t.getPolylinePoints = nm),
    (t.getRectRadiusCircle = Ym),
    (t.getSimplePoints = lm),
    (t.getSimplePolyline = L_),
    (t.getSvgTextSize = Mm),
    (t.getSvgTextWidthHeight = eb),
    (t.getTextWidth = hm),
    (t.getThetaOfVector = Zb),
    (t.getVerticalPointOfLine = N_),
    (t.getZIndex = rx),
    (t.h = Xn),
    (t.handleResize = Wb),
    (t.heuristicCostEstimate = V_),
    (t.inStraightLineOfRect = qm),
    (t.initDefaultShortcut = LE),
    (t.isBboxOverLapping = C_),
    (t.isIe = p_),
    (t.isInNode = Xm),
    (t.isInNodeBbox = Gm),
    (t.isInSegment = D_),
    (t.isMultipleSelect = Om),
    (t.isObservable = Te),
    (t.isPointInArea = Am),
    (t.isPointOutsideBBox = H_),
    (t.isSegmentCrossingBBox = $_),
    (t.isSegmentsCrossNode = im),
    (t.isSegmentsInNode = om),
    (t.isSegmentsIntersected = Z_),
    (t.mergeBBox = B_),
    (t.normalizePolygon = wm),
    (t.observable = $),
    (t.observer = zE),
    (t.pathFinder = Q_),
    (t.pickEdgeConfig = bm),
    (t.pickNodeConfig = Jm),
    (t.pointDirection = R_),
    (t.pointEdgeDirection = Km),
    (t.pointFilter = em),
    (t.points2PointsList = um),
    (t.reaction = ae),
    (t.rebuildPath = K_),
    (t.recalcResizeInfo = Hb),
    (t.refreshGraphId = Tb),
    (t.removeClosePointFromOpenList = q_),
    (t.renderHtmlText = Db),
    (t.sampleCubic = Kb),
    (t.segmentDirection = sm),
    (t.setupAnimation = c_),
    (t.setupEdgeModel = P_),
    (t.setupTheme = Qb),
    (t.snapToGrid = Tm),
    (t.targetNodeInfo = Bm),
    (t.toJS = Le),
    (t.transformEdgeData = function (t, e) {
      var n = t.startPoint,
        r = t.endPoint,
        o = t.pointsList,
        i = t.text,
        a = ro(t, ['startPoint', 'endPoint', 'pointsList', 'text'])
      a.id = ''
      var s = { x: n.x + e, y: n.y + e },
        u = { x: r.x + e, y: r.y + e },
        l = Mh(o, function (t) {
          return { x: t.x + e, y: t.y + e }
        }),
        c = i ? no(no({}, i), { x: i.x + e, y: i.y + e }) : void 0
      return no(no({}, a), {
        startPoint: s,
        endPoint: u,
        pointsList: l,
        text: c
      })
    }),
    (t.transformNodeData = function (t, e) {
      var n = t.x,
        r = t.y,
        o = t.text,
        i = o ? { x: o.x + e, y: o.y + e, value: o.value } : void 0
      return no(no({}, t), { id: '', x: n + e, y: r + e, text: i })
    }),
    (t.translateEdgeData = PE),
    (t.translateNodeData = NE),
    (t.triggerResizeEvent = Gb),
    (t.twoPointDistance = xm),
    (t.updateAnimation = d_),
    (t.updateEdgePointByAnchors = Xb),
    (t.updateTheme = tx),
    Object.defineProperty(t, '__esModule', { value: !0 })
})
//# sourceMappingURL=index.min.js.map
